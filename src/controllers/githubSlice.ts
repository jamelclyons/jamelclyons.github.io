import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { Octokit } from '@octokit/rest';
import {
  GetResponseTypeFromEndpointMethod,
  GetResponseDataTypeFromEndpointMethod,
} from '@octokit/types';

import Organization from '../model/Organization';
import User from '../model/User';
import Repo from '../model/Repo';

let octokit = new Octokit();

try {
  if (import.meta.env.VITE_OCTOKIT_AUTH == null) {
    throw new Error(
      'VITE_OCTOKIT_AUTH is not defined in the environment variables.'
    );
  } else {
    octokit = new Octokit({
      auth: import.meta.env.VITE_OCTOKIT_AUTH,
    });
  }
} catch (error) {
  const err = error as Error;
  console.error(err.message);
}

const baseURL = 'https://api.github.com';
const getUserURL = `${baseURL}/users`;

interface GithubState {
  githubLoading: boolean;
  githubStatusCode: number;
  githubError: Error | null;
  githubErrorMessage: string;
  founders: string;
  title: string;
  avatarURL: string;
  authorURL: string;
  fullName: string;
  bio: string;
  frameworks: string;
  skills: string;
  technologies: string;
  socialNetworks: string;
  resume: string;
  content: string;
  user: User;
  organizations: Array<Organization>;
  repos: Array<Repo>;
  socialAccounts: [];
  repo: RepoResponse | null;
}

const initialState: GithubState = {
  githubLoading: false,
  githubStatusCode: 0,
  githubError: null,
  githubErrorMessage: '',
  founders: '',
  title: '',
  avatarURL: '',
  authorURL: '',
  fullName: '',
  bio: '',
  frameworks: '',
  skills: '',
  technologies: '',
  socialNetworks: '',
  resume: '',
  content: '',
  user: new User(),
  organizations: [],
  repos: [],
  socialAccounts: [],
  repo: null,
};

export const getUser = createAsyncThunk<User, string>(
  'github/getUser',
  async (username) => {
    try {
      const { data } = await octokit.request(`GET /users/${username}`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return new User(data);
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getRepos = createAsyncThunk('github/getRepos', async () => {
  try {
    const { data } = await octokit.request('/user/repos');

    let repos: Array<Repo> = [];

    if (Array.isArray(data)) {
      data.forEach((repo) => {
        repos.push(new Repo(repo));
      });
    }

    return repos;
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

export const getOrganizations = createAsyncThunk<Array<Organization>, string>(
  'github/getOrganizations',
  async (username) => {
    try {
      const { data } = await octokit.request('/user/orgs');

      return data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationsRepos = createAsyncThunk(
  'github/getOrganizationsRepos',
  async (organization) => {
    try {
      const { data } = await octokit.request(`/orgs/${organization}/repos`);

      return data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export interface RepoQuery {
  owner: string;
  repo: string;
}

type RepoResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;

export const getRepo = createAsyncThunk<RepoResponse, RepoQuery>(
  'github/getRepo',
  async (query: RepoQuery) => {
    try {
      return await octokit.rest.repos.get({
        owner: query.owner,
        repo: query.repo,
      });
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getCommits = createAsyncThunk(
  'github/getFounder',
  async (username) => {
    try {
      const response = await fetch(`${getUserURL}/${username}/repos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log(responseData);

      return responseData;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getSocialAccounts = createAsyncThunk(
  'github/getSocialAccounts',
  async (username) => {
    try {
      const response = await fetch(
        `${getUserURL}/${username}/social_accounts`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      return responseData;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const githubSliceOptions: CreateSliceOptions<GithubState> = {
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.user = action.payload;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.organizations = action.payload;
      })
      .addCase(getRepos.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.repos = action.payload;
      })
      .addCase(getRepo.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.repo = action.payload;
      })
      .addCase(getSocialAccounts.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.socialAccounts = action.payload;
      })
      .addMatcher(isAnyOf(getUser.pending), (state) => {
        state.githubLoading = true;
        state.githubErrorMessage = '';
        state.githubError = null;
      })
      .addMatcher(isAnyOf(getUser.rejected), (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = action.error.message || '';
        state.githubError = action.error as Error;
      });
  },
};

export const githubSlice = createSlice(githubSliceOptions);

export default githubSlice;
