import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { getAuthenticatedAccount } from '@/controllers/githubSlice';
import { getUserData } from '@/controllers/databaseSlice';

import User from '@/model/User';

interface AccountState {
  userLoading: boolean;
  userStatusCode: string;
  userError: Error | null;
  userErrorMessage: string;
  title: string;
  avatarURL: string;
  authorURL: string;
  fullName: string;
  bio: string;
  resume: string;
  content: Array<string> | null;
  accountObject: Record<string, any> | null;
  organizations: [];
  repos: [];
  socialAccounts: [];
}

const initialState: AccountState = {
  userLoading: false,
  userStatusCode: '',
  userError: null,
  userErrorMessage: '',
  title: '',
  avatarURL: '',
  authorURL: '',
  fullName: '',
  bio: '',
  resume: '',
  content: null,
  accountObject: null,
  organizations: [],
  repos: [],
  socialAccounts: [],
};

export const getAccount = createAsyncThunk(
  'account/getAccount',
  async (_, thunkAPI) => {
    try {
      const accountResponse = await thunkAPI.dispatch(
        getAuthenticatedAccount()
      );

      if (
        getAuthenticatedAccount.fulfilled.match(accountResponse) &&
        accountResponse.payload
      ) {
        const user = new User();
        let contact_methods = null;
        let repos = null;

        user.fromGitHub(accountResponse.payload);

        if (accountResponse.payload.contact_methods) {
          contact_methods = accountResponse.payload.contact_methods;
        }

        if (accountResponse.payload.repos) {
          repos = user.setRepos(accountResponse.payload.repos);
        }

        const databaseResponse = await thunkAPI.dispatch(getUserData(user.id));

        if (
          getUserData.fulfilled.match(databaseResponse) &&
          databaseResponse.payload
        ) {
          user.fromDB(databaseResponse.payload);
        }
        
        return {
          ...user.toObject(),
          repos: repos,
          contact_methods: contact_methods,
        };
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const accountSliceOptions: CreateSliceOptions<AccountState> = {
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccount.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.accountObject = action.payload;
      })
      .addMatcher(isAnyOf(getAccount.pending), (state) => {
        state.userLoading = true;
        state.userErrorMessage = '';
        state.userError = null;
      })
      .addMatcher(isAnyOf(getAccount.rejected), (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = action.error.message || '';
        state.userError = action.error as Error;
      });
  },
};

export const accountSlice = createSlice(accountSliceOptions);

export default accountSlice;
