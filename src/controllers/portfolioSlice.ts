import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';

import db from '../services/firebase/config';

import Project from '../model/Project';
import Repo from '../model/Repo';

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
  skillsObject: [],
};

export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async (repos: Array<Repo>) => {
    try {
      let projects: Set<Record<string, any>> = new Set();
      let repoProjects: Set<Record<string, any>> = new Set();

      const querySnapshot: QuerySnapshot = await getDocs(portfolioCollection);

      if (repos.length > 0) {
        repos.forEach((repo) => {
          let project = new Project();

          project.fromRepo(repo);

          repoProjects.add(project.toObject());
        });
      }

      if (querySnapshot.size > 0) {
        repoProjects.forEach((project: Record<string, any>) => {
          const matchingDoc = querySnapshot.docs.find(
            (doc) => doc.id === project.id
          );

          if (matchingDoc) {
            project.fromDocumentData(matchingDoc.id, matchingDoc.data());
          }

          projects.add(project.toObject());
        });

        return Array.from(projects);
      }
      
      return Array.from(repoProjects);
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
      const docs = querySnapshot.docs;

      if (docs.length === 0) {
        throw new Error('No projects found.');
      }

      let projects: Array<Record<string, any>> = [];

      docs.forEach((doc) => {
        let project = new Project();
        project.fromDocumentData(doc.id, doc.data());
        projects.push(project.toObject());
      });

      return projects;
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
    setSkills: (state, action) => {
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

export const { setSkills } = portfolioSlice.actions;
export default portfolioSlice;
