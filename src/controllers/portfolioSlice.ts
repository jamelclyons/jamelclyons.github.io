import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import GitHubRepoQuery from '@/model/GitHubRepoQuery';

import { getProject } from './projectSlice';
import { setMessage } from './messageSlice';

interface PortfolioState {
  portfolioLoading: boolean;
  portfolioError: Error | null;
  portfolioErrorMessage: string;
  portfolioObject: Array<Record<string, any>> | null;
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
        await thunkAPI.dispatch(
          setMessage(
            `Now Loading Project by ${query.owner} called ${query.repo}`
          )
        );

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

export const getOrganizationPortfolio = createAsyncThunk(
  'portfolio/getOrganizationPortfolio',
  async (queries: Array<GitHubRepoQuery>, thunkAPI) => {
    try {
      if (!Array.isArray(queries) || queries.length === 0) {
        return null;
      }

      const portfolioPromises = queries.map(async (query) => {
        await thunkAPI.dispatch(
          setMessage(
            `Now Loading Project by ${query.owner} called ${query.repo}`
          )
        );

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
