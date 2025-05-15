import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import GitHubRepoQuery from '@/model/GitHubRepoQuery';

import { getProject } from './projectSlice';
import Portfolio, { PortfolioObject } from '@/model/Portfolio';
import Project from '@/model/Project';
import { getProjectData } from './databaseSlice';
import { getRepo, getRepoLanguages } from './githubSlice';
import Repo from '@/model/Repo';

interface PortfolioState {
  portfolioLoading: boolean;
  portfolioError: Error | null;
  portfolioErrorMessage: string;
  portfolioObject: PortfolioObject | null;
  organizationPortfolioObject: Array<Record<string, any>> | null;
  projects: Array<Record<string, any>> | null;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioError: null,
  portfolioErrorMessage: '',
  portfolioObject: null,
  organizationPortfolioObject: null,
  projects: null,
};

export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async (queries: Array<GitHubRepoQuery>, thunkAPI) => {
    try {
      if (!Array.isArray(queries) || queries.length === 0) {
        return null;
      }

      const portfolioPromises = queries.map(async (query) => {
        const repoResponse = await thunkAPI.dispatch(getRepo(query)).unwrap();

        if (repoResponse) {
          const repo = new Repo(repoResponse);

          const langResponse = await thunkAPI
            .dispatch(getRepoLanguages(query))
            .unwrap();

          if (langResponse) {
            repo.languagesFromGithub(langResponse);
          }

          const project = new Project();
          project.fromRepo(repo);

          const projectDataResponse = await thunkAPI.dispatch(
            getProjectData(query.repo)
          );

          if (
            getProjectData.fulfilled.match(projectDataResponse) &&
            projectDataResponse.payload?.data
          ) {
            project.fromDocumentData(projectDataResponse.payload.data);
          }
          return null;
        }
      });

      const projects = (await Promise.all(portfolioPromises)).filter(
        (project) => project !== null
      );

      const portfolio = new Portfolio();
      portfolio.setProjects(
        new Set(projects.map((project) => new Project(project)))
      );

      return portfolio.toPortfolioObject();
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }
);

export const getOrganizationPortfolio = createAsyncThunk(
  'portfolio/getOrganizationPortfolio',
  async (queries: Array<GitHubRepoQuery>, thunkAPI) => {
    try {
      if (!Array.isArray(queries) || queries.length === 0) {
        return null;
      }

      const portfolioPromises = queries.map(async (query) => {
        const projectResponse = await thunkAPI.dispatch(getProject(query));

        if (
          getProject.fulfilled.match(projectResponse) &&
          projectResponse.payload
        ) {
          return projectResponse.payload;
        }

        return null;
      });

      const portfolio = (await Promise.all(portfolioPromises)).filter(
        (project) => project !== null
      );

      return portfolio;
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = '';
        state.portfolioObject = action.payload;
      })
      .addCase(getOrganizationPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = '';
        state.organizationPortfolioObject = action.payload;
      })
      .addMatcher(
        isAnyOf(getPortfolio.pending, getOrganizationPortfolio.pending),
        (state) => {
          state.portfolioLoading = true;
          state.portfolioError = null;
          state.portfolioErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(getPortfolio.rejected, getOrganizationPortfolio.rejected),
        (state, action) => {
          state.portfolioLoading = false;
          state.portfolioError = (action.error as Error) || null;
          state.portfolioErrorMessage = action.error.message || '';
        }
      );
  },
});

export default portfolioSlice;
