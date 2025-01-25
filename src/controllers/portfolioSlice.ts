import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  query,
  where,
  QuerySnapshot,
} from 'firebase/firestore';

import { db } from '../services/firebase/config';

export type SkillsObject = {
  types: Array<Record<string, any>>;
  languages: Array<Record<string, any>>;
  frameworks: Array<Record<string, any>>;
  technologies: Array<Record<string, any>>;
};

const portfolioCollection = collection(db, 'portfolio');

interface PortfolioState {
  portfolioLoading: boolean;
  portfolioError: Error | null;
  portfolioErrorMessage: string;
  portfolioObject: Array<Record<string, any>>;
  projects: Array<Record<string, any>>;
  skillsObject: Record<string, any>;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioError: null,
  portfolioErrorMessage: '',
  portfolioObject: [],
  projects: [],
  skillsObject: {},
};

export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async () => {
    try {
      const querySnapshot: QuerySnapshot = await getDocs(portfolioCollection);

      if (querySnapshot.empty) {
        return [];
      }

      return querySnapshot.docs as Array<Record<string, any>>;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

interface QueryProjectsParams {
  taxonomy: string;
  term: string;
}

export const getProjectsBy = createAsyncThunk(
  'portfolio/getProjectsBy',
  async (params: QueryProjectsParams) => {
    try {
      const contentCollection = collection(db, 'portfolio');
      const projectQuery = query(
        contentCollection,
        where(params.taxonomy, 'array-contains', params.term)
      );
      const querySnapshot = await getDocs(projectQuery);

      return querySnapshot.docs as Array<Record<string, any>>;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolioSkills: (state, action: PayloadAction<SkillsObject>) => {
      state.skillsObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = '';
        state.portfolioObject = action.payload;
      })
      .addCase(getProjectsBy.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = '';
        state.projects = action.payload;
      })
      .addMatcher(
        isAnyOf(getPortfolio.pending, getProjectsBy.pending),
        (state) => {
          state.portfolioLoading = true;
          state.portfolioError = null;
          state.portfolioErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(getPortfolio.rejected, getProjectsBy.rejected),
        (state, action) => {
          state.portfolioLoading = false;
          state.portfolioError = (action.error as Error) || null;
          state.portfolioErrorMessage = action.error.message || '';
        }
      );
  },
});

export const { setPortfolioSkills } = portfolioSlice.actions;
export default portfolioSlice;
