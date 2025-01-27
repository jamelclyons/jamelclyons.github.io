import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { GetResponseTypeFromEndpointMethod } from '@octokit/types';

import RepoContent from '../model/RepoContent';
import Organization from '../model/Organization';
import Repo from '../model/Repo';
import GitHubRepoQuery from '../model/GitHubRepoQuery';
import RepoContentQuery from '@/model/RepoContentQuery';

type OctokitResponse<T = any, S = number> = {
  data: T;
  status: S;
};

type RepoLanguagesQuery =
  RestEndpointMethodTypes['repos']['listLanguages']['parameters'];
type RepoLanguages =
  RestEndpointMethodTypes['repos']['listLanguages']['response'];

const octokit = new Octokit({
  auth: import.meta.env.VITE_OCTOKIT_AUTH,
});

interface GithubState {
  githubLoading: boolean;
  githubStatusCode: number;
  githubError: Error | null;
  githubErrorMessage: string;
  userObject: Record<string, any>;
  organizationObject: Record<string, any>;
  organizationReposObject: Array<Record<string, any>>;
  organizationsObject: Array<Record<string, any>>;
  repos: Array<Record<string, any>>;
  socialAccounts: OctokitResponse | null;
  repoObject: Record<string, any>;
  repoLanguages: Array<Record<string, any>>;
  contents: Array<Record<string, any>>;
  file: string | null;
  contributorsObject: Array<Record<string, any>>;
}

const initialState: GithubState = {
  githubLoading: false,
  githubStatusCode: 0,
  githubError: null,
  githubErrorMessage: '',
  userObject: {},
  organizationObject: {},
  organizationReposObject: [],
  organizationsObject: [],
  repos: [],
  socialAccounts: null,
  repoObject: {},
  repoLanguages: [],
  contents: [],
  file: null,
  contributorsObject: [],
};

export const getUser = createAsyncThunk(
  'github/getUser',
  async (username: string) => {
    try {
      const { data } = await octokit.request(`GET /users/${username}`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return data;
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

    return data;
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

export const getOrganization = createAsyncThunk(
  'github/getOrganization',
  async (organization: string) => {
    try {
      const { data } = await octokit.request(`/orgs/${organization}`);

      return data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizations = createAsyncThunk(
  'github/getOrganizations',
  async () => {
    try {
      const { data } = await octokit.request('/user/orgs');

      return data as Array<Record<string, any>>;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationsRepos = createAsyncThunk(
  'github/getOrganizationsRepos',
  async (organization: string) => {
    try {
      const { data } = await octokit.request(`/orgs/${organization}/repos`);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }
);

type RepoResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;

export const getRepo = createAsyncThunk(
  'github/getRepo',
  async (query: GitHubRepoQuery) => {
    try {
      const repo: RepoResponse = await octokit.rest.repos.get({
        owner: query.owner,
        repo: query.repo,
      });

      return repo.data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getRepoContents = createAsyncThunk(
  'github/getRepoContents',
  async (query: GitHubRepoQuery) => {
    try {
      const repoContents = await octokit.rest.repos.getContent({
        owner: query.owner,
        repo: query.repo,
        path: '',
      });

      let contents: Array<Record<string, any>> = [];

      if (Array.isArray(repoContents.data) && repoContents.data.length > 0) {
        repoContents.data.forEach((content) => {
          contents.push(new RepoContent(content).toObject());
        });
      }

      return contents;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getRepoFile = createAsyncThunk(
  'github/getRepoFile',
  async (query: RepoContentQuery) => {
    try {
      const { owner, repo, path, branch } = query;

      const response: OctokitResponse = await octokit.repos.getContent({
        owner: owner,
        repo: repo,
        path: path,
        ref: branch,
      });

      return atob(response.data.content);
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getRepoLanguages = createAsyncThunk(
  'github/getRepoLanguages',
  async (repo: Repo) => {
    try {
      const repoLanguages: RepoLanguages =
        await octokit.rest.repos.listLanguages({
          owner: repo.owner.login,
          repo: repo.id,
        });

      let skillsArray: Array<Record<string, any>> = [];

      Object.entries(repoLanguages.data).forEach(([language, usage]) => {
        let skill = { language: language, usage: usage };
        skillsArray.push(skill);
      });

      return skillsArray;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getContributors = createAsyncThunk(
  'github/getContributors',
  async (query: GitHubRepoQuery) => {
    try {
      const repoContributors = await octokit.rest.repos.listContributors({
        owner: query.owner,
        repo: query.repo,
      });

      let contributors: Array<Record<string, any>> = [];

      repoContributors.data.forEach((user) => {
        contributors.push(user);
      });

      return contributors;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getCommits = createAsyncThunk(
  'github/getCommits',
  async (username: string) => {
    try {
      const response = await octokit.request(`users/${username}/repos`);

      console.log(response);

      return response;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getSocialAccounts = createAsyncThunk(
  'github/getSocialAccounts',
  async (username: string) => {
    try {
      const response: OctokitResponse = await octokit.request(
        `users/${username}/social_accounts`
      );

      return response;
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
        state.userObject = action.payload;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.organizationsObject = action.payload;
      })
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.organizationObject = action.payload;
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
        state.repoObject = action.payload;
      })
      .addCase(getRepoContents.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.contents = action.payload;
      })
      .addCase(getRepoFile.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.file = action.payload;
      })
      .addCase(getRepoLanguages.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.githubStatusCode = 200;
        state.repoLanguages = action.payload;
      })
      .addCase(getSocialAccounts.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.socialAccounts = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getUser.pending,
          getOrganizations.pending,
          getRepos.pending,
          getRepo.pending,
          getRepoContents.pending,
          getRepoLanguages.pending,
          getSocialAccounts.pending,
          getRepoFile.pending
        ),
        (state) => {
          state.githubLoading = true;
          state.githubErrorMessage = '';
          state.githubError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getUser.rejected,
          getOrganizations.rejected,
          getRepos.rejected,
          getRepo.rejected,
          getRepoContents.rejected,
          getRepoLanguages.rejected,
          getSocialAccounts.rejected,
          getRepoFile.rejected
        ),
        (state, action) => {
          state.githubLoading = false;
          state.githubErrorMessage = action.error.message || '';
          state.githubError = action.error as Error;
        }
      );
  },
};

export const githubSlice = createSlice(githubSliceOptions);

export default githubSlice;
