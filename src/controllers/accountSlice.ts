import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { getAuthenticatedAccount } from '@/controllers/githubSlice';
import { getUserData } from '@/controllers/databaseSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from '@/controllers/taxonomiesSlice';

import User from '@/model/User';
import Repos from '@/model/Repos';
import Portfolio from '@/model/Portfolio';

interface AccountState {
  accountLoading: boolean;
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
  accountLoading: false,
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

        let types: Array<Record<string, any>> = [];
        let languages: Array<Record<string, any>> = [];
        let frameworks: Array<Record<string, any>> = [];
        let technologies: Array<Record<string, any>> = [];

        const typesResponse = await thunkAPI.dispatch(getProjectTypes());

        if (
          getProjectTypes.fulfilled.match(typesResponse) &&
          typesResponse.payload
        ) {
          types = typesResponse.payload;
        }

        const languagesResponse = await thunkAPI.dispatch(getLanguages());

        if (
          getLanguages.fulfilled.match(languagesResponse) &&
          languagesResponse.payload
        ) {
          languages = languagesResponse.payload;
        }

        const frameworksResponse = await thunkAPI.dispatch(getFrameworks());

        if (
          getFrameworks.fulfilled.match(frameworksResponse) &&
          frameworksResponse.payload
        ) {
          frameworks = frameworksResponse.payload;
        }

        const technologiesResponse = await thunkAPI.dispatch(getTechnologies());

        if (
          getTechnologies.fulfilled.match(technologiesResponse) &&
          technologiesResponse.payload
        ) {
          technologies = technologiesResponse.payload;
        }

        const portfolio = new Portfolio();
        let projects = null;

        if (repos) {
          projects = portfolio.getProjectsFromRepos(new Repos(repos));
        }

        return {
          user: {
            ...user.toObject(),
            repos: repos,
            contact_methods: contact_methods,
          },
          skills: {
            types: types,
            languages: languages,
            frameworks: frameworks,
            technologies: technologies,
          },
          projects: projects,
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
        state.accountLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.accountObject = action.payload;
      })
      .addMatcher(isAnyOf(getAccount.pending), (state) => {
        state.accountLoading = true;
        state.userErrorMessage = '';
        state.userError = null;
      })
      .addMatcher(isAnyOf(getAccount.rejected), (state, action) => {
        state.accountLoading = false;
        state.userErrorMessage = action.error.message || '';
        state.userError = action.error as Error;
      });
  },
};

export const accountSlice = createSlice(accountSliceOptions);

export default accountSlice;
