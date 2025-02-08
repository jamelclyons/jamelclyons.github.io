import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { getUserAccount } from '@/controllers/githubSlice';
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
  userObject: Record<string, any> | null;
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

export const getUser = createAsyncThunk(
  'user/getUser',
  async (login: string, thunkAPI) => {
    try {
      const userResponse = await thunkAPI.dispatch(getUserAccount(login));

      if (
        getUserAccount.fulfilled.match(userResponse) &&
        userResponse.payload
      ) {
        console.log(userResponse.payload)
        const user = new User(userResponse.payload);
        const databaseResponse = await thunkAPI.dispatch(getUserData(user.id));

        if (
          getUserData.fulfilled.match(databaseResponse) &&
          databaseResponse.payload
        ) {
          user.fromDB(databaseResponse.payload);
        }

        return user.toObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

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
