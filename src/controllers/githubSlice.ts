import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { Octokit } from '@octokit/rest';
import { GetResponseTypeFromEndpointMethod } from '@octokit/types';

import RepoContent from '../model/RepoContent';
import Organization from '../model/Organization';
import User from '../model/User';
import Repo from '../model/Repo';
import Taxonomy from '../model/Taxonomy';
import GitHubRepoQuery from '../model/GitHubRepoQuery';

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
  userObject: Record<string, any>;
  organizationObject: Record<string, any>;
  organizations: Array<Record<string, any>>;
  repos: Array<Record<string, any>>;
  socialAccounts: [];
  repo: Record<string, any>;
  contents: Array<Record<string, any>>;
  contributorsObject: Array<Record<string, any>>;
}

const initialState: GithubState = {
  githubLoading: false,
  githubStatusCode: 0,
  githubError: null,
  githubErrorMessage: '',
  userObject: {},
  organizationObject: {},
  organizations: [],
  repos: [],
  socialAccounts: [],
  repo: {},
  contents: [],
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

      return new User(data).toObject();
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

    let repos: Array<Record<string, any>> = [];

    if (Array.isArray(data)) {
      data.forEach((repo) => {
        repos.push(new Repo(repo).toObject());
      });
    }

    return repos;
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

export const getOrganizations = createAsyncThunk(
  'github/getOrganizations',
  async () => {
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

export const getOrganizationsRepos = createAsyncThunk(
  'github/getOrganizationsRepos',
  async (organization: string) => {
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

type RepoResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;

export const getRepo = createAsyncThunk(
  'github/getRepo',
  async (query: Record<string, any>) => {
    try {
      const repo: RepoResponse = await octokit.rest.repos.get({
        owner: query.owner as string,
        repo: query.repo as string,
      });

      return new Repo(repo.data).toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getRepoContents = createAsyncThunk(
  'github/getRepoContents',
  async (query: Record<string, any>) => {
    try {
      const repoContents = await octokit.rest.repos.getContent({
        owner: query.owner as string,
        repo: query.repo as string,
        path: query.path as string,
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

export const getRepoLanguages = createAsyncThunk(
  'github/getRepoLanguages',
  async (repoObject: Record<string, any>) => {
    try {
      const repoLanguages = await octokit.rest.repos.listLanguages({
        owner: repoObject.owner.login,
        repo: repoObject.id,
      });

      let skills: Array<Record<string, any>> = [];

      Object.entries(repoLanguages.data).forEach(([language, usage]) => {
        let skill = { language: language, usage: usage };
        skills.push(skill);
      });

      const repo = new Repo(repoObject);
      repo.setSkills(skills);

      return repo.toObject();
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
        state.userObject = action.payload;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.organizations = action.payload;
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
        state.repo = action.payload;
      })
      .addCase(getRepoContents.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.contents = action.payload;
      })
      .addCase(getRepoLanguages.fulfilled, (state, action) => {
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
      .addMatcher(
        isAnyOf(
          getUser.pending,
          getOrganizations.pending,
          getRepos.pending,
          getRepo.pending,
          getRepoContents.pending,
          getRepoLanguages.pending,
          getSocialAccounts.pending
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
          getSocialAccounts.rejected
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
