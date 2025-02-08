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

import { Framework, Language, ProjectType, Technology } from '@/model/Taxonomy';
import Image from '@/model/Image';

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
  portfolioObject: Array<Record<string, any>> | null;
  projects: Array<Record<string, any>> | null;
  skillsObject: Record<string, any>;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioError: null,
  portfolioErrorMessage: '',
  portfolioObject: null,
  projects: null,
  skillsObject: {},
};

export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async () => {
    try {
      const querySnapshot: QuerySnapshot = await getDocs(portfolioCollection);

      if (querySnapshot.size > 0) {
        return querySnapshot.docs as Array<Record<string, any>>;
      }

      return null;
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
    setPortfolioSkills: (state, action: PayloadAction<Record<string, any>>) => {
      const serializeSkills = (skills: Record<string, any>): SkillsObject => {
        return {
          types: skills.types.map((item: Record<string, any>) => {
            const type = new ProjectType(item).toObject();
            const image = new Image(item.image).toObject();

            type.image = image;
            return type;
          }),
          languages: skills.languages.map((item: Record<string, any>) =>
            new Language(item).toObject()
          ),
          frameworks: skills.frameworks.map((item: Record<string, any>) =>
            new Framework(item).toObject()
          ),
          technologies: skills.technologies.map((item: Record<string, any>) =>
            new Technology(item).toObject()
          ),
        };
      };

      state.skillsObject = serializeSkills(action.payload);
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
