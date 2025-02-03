import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { instance } from '@/services/github/octokit';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { GetResponseTypeFromEndpointMethod } from '@octokit/types';

import RepoContent from '../model/RepoContent';
import GitHubRepoQuery from '../model/GitHubRepoQuery';
import RepoContentQuery from '@/model/RepoContentQuery';
import Organization from '@/model/Organization';

import { headers } from '@/services/github/octokit';
import Repo from '@/model/Repo';

type OctokitResponse<T = any, S = number> = {
  data: T;
  status: S;
};

type RepoLanguagesQuery =
  RestEndpointMethodTypes['repos']['listLanguages']['parameters'];
type RepoLanguages =
  RestEndpointMethodTypes['repos']['listLanguages']['response'];

const octokit = instance;

interface GithubState {
  githubLoading: boolean;
  githubStatusCode: number;
  githubError: Error | null;
  githubErrorMessage: string;
  userObject: Record<string, any> | null;
  organizationObject: Record<string, any>;
  organizationReposObject: Array<Record<string, any>>;
  organizationsObject: Array<Record<string, any>>;
  organizationDetailsList: Array<Record<string, any>> | null;
  repos: Array<Record<string, any>>;
  repoDetailsList: Array<Record<string, any>> | null;
  socialAccounts: OctokitResponse | null;
  repoObject: Record<string, any>;
  repoLanguages: Array<Record<string, any>>;
  contents: Array<Record<string, any>> | null;
  file: string | null;
  contributorsObject: Array<Record<string, any>>;
}

const initialState: GithubState = {
  githubLoading: false,
  githubStatusCode: 0,
  githubError: null,
  githubErrorMessage: '',
  userObject: null,
  organizationObject: {},
  organizationReposObject: [],
  organizationsObject: [],
  organizationDetailsList: null,
  repos: [],
  repoDetailsList: null,
  socialAccounts: null,
  repoObject: {},
  repoLanguages: [],
  contents: null,
  file: null,
  contributorsObject: [],
};

export const getAccount = createAsyncThunk('github/getUser', async () => {
  try {
    const { data } = await octokit.users.getAuthenticated();

    return data;
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

export const getSocialAccounts = createAsyncThunk(
  'github/getSocialAccounts',
  async (username: string) => {
    try {
      const response: OctokitResponse =
        await octokit.users.listSocialAccountsForUser({ username });

      return response.data;
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
  async (query: GitHubRepoQuery) => {
    try {
      const repo: RepoResponse = await octokit.rest.repos.get({
        owner: query.owner,
        repo: query.repo,
      });

      return repo.data as Record<string, any>;
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
      console.warn(err);
    }
  }
);

export const getRepoLanguages = createAsyncThunk(
  'github/getRepoLanguages',
  async (query: GitHubRepoQuery) => {
    try {
      const repoLanguages = await octokit.rest.repos.listLanguages({
        owner: query.owner,
        repo: query.repo,
      });

      if (!repoLanguages.data) return [];

      return Object.entries(repoLanguages.data).map(([language, usage]) => ({
        language,
        usage: usage as number,
      }));
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
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

      if (
        Array.isArray(repoContributors.data) &&
        repoContributors.data.length > 0
      ) {
        repoContributors.data.forEach((user) => {
          contributors.push(user);
        });
      }

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

export const getRepoDetails = createAsyncThunk(
  'github/getRepoDetails',
  async (query: GitHubRepoQuery, thunkAPI) => {
    try {
      const repoResponse = await thunkAPI.dispatch(getRepo(query));

      if (getRepo.fulfilled.match(repoResponse) && repoResponse.payload) {
        const repo = new Repo(repoResponse.payload);
        let skills = null;
        let contents = null;

        const langResponse = await thunkAPI.dispatch(getRepoLanguages(query));

        if (
          getRepoLanguages.fulfilled.match(langResponse) &&
          langResponse.payload
        ) {
          skills = repo.setSkills(langResponse.payload);
        }

        if (repo.size > 0) {
          const contentsResponse = await thunkAPI.dispatch(
            getRepoContents(query)
          );

          if (
            getRepoContents.fulfilled.match(contentsResponse) &&
            contentsResponse.payload
          ) {
            contents = repo.filterContents(contentsResponse.payload);
          }
        }

        return { ...repo.toObject(), skills, contents };
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching repository details:', err);
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

export const getRepoDetailsList = createAsyncThunk(
  'github/getRepoDetailsList',
  async (_, thunkAPI) => {
    try {
      let repoDetailsList: Array<Record<string, any>> = [];

      const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser(
        {
          visibility: 'all',
          per_page: 100,
        }
      );

      if (Array.isArray(repos) && repos.length > 0) {
        for (const repo of repos) {
          const query = new GitHubRepoQuery(repo.owner.login, repo.name);
          const repoDetailsResponse = await thunkAPI.dispatch(
            getRepoDetails(query)
          );

          if (
            getRepoDetails.fulfilled.match(repoDetailsResponse) &&
            repoDetailsResponse.payload
          ) {
            repoDetailsList.push(repoDetailsResponse.payload);
          }
        }

        return repoDetailsList;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching repository details:', err);
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

export const getOrganization = createAsyncThunk(
  'github/getOrganization',
  async (organization: string) => {
    try {
      const { data } = await octokit.request(`/orgs/${organization}`);
      const orgDetails = new Organization(data);

      return orgDetails.toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationDetailsList = createAsyncThunk(
  'github/getOrganizationsDetailsList',
  async (url: string, thunkAPI) => {
    try {
      let organizations: Array<Record<string, any>> = [];

      const organizationDetailsList = await fetch(url, {
        headers: headers,
      });

      const orgDetailsList = await organizationDetailsList.json();

      if (Array.isArray(orgDetailsList) && orgDetailsList.length > 0) {
        for (const organization of orgDetailsList) {
          const orgResponse = await thunkAPI.dispatch(
            getOrganization(organization.login)
          );

          if (
            getOrganization.fulfilled.match(orgResponse) &&
            orgResponse.payload
          ) {
            organizations.push(orgResponse.payload);
          }
        }

        return organizations;
      }

      return null;
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

const githubSliceOptions: CreateSliceOptions<GithubState> = {
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccount.fulfilled, (state, action) => {
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
      .addCase(getOrganizationDetailsList.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.organizationDetailsList = action.payload;
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
      .addCase(getRepoDetailsList.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.repoDetailsList = action.payload;
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
        state.contents = action.payload ?? [];
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
          getAccount.pending,
          getOrganizations.pending,
          getRepos.pending,
          getRepo.pending,
          getRepoContents.pending,
          getRepoLanguages.pending,
          getRepoDetailsList.pending,
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
          getAccount.rejected,
          getOrganizations.rejected,
          getRepos.rejected,
          getRepo.rejected,
          getRepoContents.rejected,
          getRepoLanguages.rejected,
          getRepoDetailsList.rejected,
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
