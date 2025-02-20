import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import {
  getAuthenticatedAccount,
  getUserAccount,
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
  userObject: Record<string, any> | null;
  authenticatedUserObject: Record<string, any> | null;
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
  authenticatedUserObject: null,
  userObject: null,
  organizations: [],
  repos: [],
  socialAccounts: [],
};

export const getAuthenticatedUserAccount = createAsyncThunk(
  'user/getAuthenticatedUserAccount',
  async (_, thunkAPI) => {
    try {
      const userResponse = await thunkAPI.dispatch(getAuthenticatedAccount());

      if (
        getAuthenticatedAccount.fulfilled.match(userResponse) &&
        userResponse.payload
      ) {
        const user = new User(userResponse.payload);
        let organizations = [];
        let repos = [];

        const databaseResponse = await thunkAPI.dispatch(getUserData(user.id));

        if (
          getUserData.fulfilled.match(databaseResponse) &&
          databaseResponse.payload?.data
        ) {
          user.fromDB(databaseResponse.payload.data);
        }

        organizations = user.organizations.list.map((organization) => ({
          ...organization.toObject(),
          repos: organization.repos.collection.map((repo) => repo.toObject()),
          contributors: organization.repos.collection.map((repo) =>
            repo.contributors.toObject()
          ),
        }));

        repos =
          Array.isArray(user.repos.collection) &&
          user.repos.collection.length > 0
            ? user.repos.collection?.map((repo) => ({
                ...repo.toObject(),
                contributors:
                  Array.isArray(repo.contributors.users) &&
                  repo.contributors.users.length > 0
                    ? repo.contributors.users?.map((contributor) => {
                        contributor.toObject();
                      })
                    : [],
              }))
            : [];

        return {
          ...user.toObject(),
          organizations: organizations,
          repos: repos,
          repo_queries:
            Array.isArray(repos) && repos.length > 0
              ? user.getRepoQueries(repos)
              : [],
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

export const getUser = createAsyncThunk(
  'user/getUser',
  async (login: string, thunkAPI) => {
    try {
      const userResponse = await thunkAPI.dispatch(getUserAccount(login));

      if (
        getUserAccount.fulfilled.match(userResponse) &&
        userResponse.payload
      ) {
        // const databaseResponse = await thunkAPI.dispatch(getUserData(user.id));

        // if (
        //   getUserData.fulfilled.match(databaseResponse) &&
        //   databaseResponse.payload
        // ) {
        //   user.fromDB(databaseResponse.payload);
        // }

        return { ...userResponse.payload };
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
      .addCase(getAuthenticatedUserAccount.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.authenticatedUserObject = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.userObject = action.payload;
      })
      .addMatcher(
        isAnyOf(getUser.pending, getAuthenticatedUserAccount.pending),
        (state) => {
          state.userLoading = true;
          state.userErrorMessage = '';
          state.userError = null;
        }
      )
      .addMatcher(
        isAnyOf(getUser.rejected, getAuthenticatedUserAccount.rejected),
        (state, action) => {
          state.userLoading = false;
          state.userErrorMessage = action.error.message || '';
          state.userError = action.error as Error;
        }
      );
  },
};

export const userSlice = createSlice(userSliceOptions);

export default userSlice;
