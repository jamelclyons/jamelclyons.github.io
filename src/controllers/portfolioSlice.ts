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
  portfolio: Set<Project>;
  projects: Array<Project>;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioError: null,
  portfolioErrorMessage: '',
  portfolio: new Set(),
  projects: [],
};

export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async (repos: Array<Repo>) => {
    try {
      let projects: Set<Project> = new Set();
      let repoProjects: Set<Project> = new Set();

      const querySnapshot: QuerySnapshot = await getDocs(portfolioCollection);

      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc: DocumentData) => {
          let project = new Project();
          project.fromDocumentData(doc.id, doc.data());

          projects.add(project);
        });
      }

      if (Array.isArray(repos) && repos.length > 0) {
        repos.forEach((repo) => {
          projects.forEach((project: Project) => {
            if (repo.id === project.id) {
              project.fromRepo(repo);
            }

            repoProjects.add(project);
          });
        });
      }

      const portfolio = new Set<Project>([...projects, ...repoProjects]);

      return portfolio;
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

      let projects: Array<Project> = [];

      docs.forEach((doc) => {
        let project = new Project();
        project.fromDocumentData(doc.id, doc.data());
        projects.push(project);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = '';
        state.portfolio = action.payload;
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

export default portfolioSlice;
