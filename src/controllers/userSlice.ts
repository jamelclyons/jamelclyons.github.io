import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import {
  getAccount,
  getOrganizationDetailsList,
  getRepoDetailsList,
  getSocialAccounts,
} from '@/controllers/githubSlice';
import { getUserData } from '@/controllers/databaseSlice';

import User from '@/model/User';

interface UserState {
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
  userObject: Record<string, any>;
  organizations: [];
  repos: [];
  socialAccounts: [];
}

const initialState: UserState = {
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
  userObject: {},
  organizations: [],
  repos: [],
  socialAccounts: [],
};

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const user = new User();

    let organizations = null;
    let repos = null;

    const userResponse = await thunkAPI.dispatch(getAccount());

    if (getAccount.fulfilled.match(userResponse) && userResponse.payload) {
      user.fromGitHub(userResponse.payload);
    }

    if (user.organizationsURL) {
      const orgResponse = await thunkAPI.dispatch(
        getOrganizationDetailsList(user.organizationsURL)
      );

      if (
        getOrganizationDetailsList.fulfilled.match(orgResponse) &&
        orgResponse.payload
      ) {
        organizations = orgResponse.payload;
      }
    }

    const repoResponse = await thunkAPI.dispatch(getRepoDetailsList());

    if (
      getRepoDetailsList.fulfilled.match(repoResponse) &&
      repoResponse.payload
    ) {
      repos = repoResponse.payload;
    }

    const contactsResponse = await thunkAPI.dispatch(
      getSocialAccounts(user.id)
    );

    if (
      getSocialAccounts.fulfilled.match(contactsResponse) &&
      contactsResponse.payload
    ) {
      user.setContactMethods(contactsResponse.payload);
    }

    const databaseResponse = await thunkAPI.dispatch(getUserData(user.id));

    if (
      getUserData.fulfilled.match(databaseResponse) &&
      databaseResponse.payload
    ) {
      user.fromDB(databaseResponse.payload);
    }

    return { ...user.toObject(), organizations, repos };
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

const userSliceOptions: CreateSliceOptions<UserState> = {
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.userObject = action.payload;
      })
      .addMatcher(isAnyOf(getUser.pending), (state) => {
        state.userLoading = true;
        state.userErrorMessage = '';
        state.userError = null;
      })
      .addMatcher(isAnyOf(getUser.rejected), (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = action.error.message || '';
        state.userError = action.error as Error;
      });
  },
};

export const userSlice = createSlice(userSliceOptions);

export default userSlice;
