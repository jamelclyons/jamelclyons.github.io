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

import db from '../services/firebase/config.ts';

import Project from '../model/Project.ts';
import ProjectSolution from '../model/ProjectSolution.ts';
import ProjectProcess from '../model/ProjectProcess.ts';
import ProjectProblem from '../model/ProjectProblem.ts';
import ProjectDesign from '../model/ProjectDesign.ts';
import ProjectDevelopment from '../model/ProjectDevelopment.ts';
import ProjectDelivery from '../model/ProjectDelivery.ts';

const portfolioCollection = collection(db, 'portfolio');

interface PortfolioState {
  portfolioLoading: boolean;
  portfolioError: Error | null;
  portfolioErrorMessage: string;
  portfolio: Array<Project>;
  projects: Array<Project>;
  project: Project | null;
}

const initialState: PortfolioState = {
  portfolioLoading: false,
  portfolioError: null,
  portfolioErrorMessage: '',
  portfolio: [],
  projects: [],
  project: null,
};

function getProjectFromObject(doc: DocumentData): Project {
  const data = doc.data();

  const design = new ProjectDesign(data.process.design);
  const development = new ProjectDevelopment(data.process.development);
  const delivery = new ProjectDelivery(data.process.delivery);

  const project = new Project(
    doc.id,
    data.title,
    data.description,
    data.urlsList,
    new ProjectSolution(data.solution),
    new ProjectProcess(data.process.status, design, development, delivery),
    new ProjectProblem(data.problem),
    data.types,
    data.languages,
    data.frameworks,
    data.technologies,
    data.details
  );

  return project;
}

export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async () => {
    try {
      const querySnapshot: QuerySnapshot = await getDocs(portfolioCollection);

      if (querySnapshot.size === 0) {
        throw new Error('No projects found.');
      }

      let portfolio: Array<Project> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        const project: Project = getProjectFromObject(doc);
        portfolio.push(project);
      });

      return portfolio;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
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
        const project: Project = getProjectFromObject(doc);
        projects.push(project);
      });

      return projects;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
);

export const getProject = createAsyncThunk(
  'portfolio/getProject',
  async (projectID: string) => {
    try {
      const docRef = doc(portfolioCollection, projectID);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Could not be found.');
      }

      return getProjectFromObject(docSnap);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
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
      .addCase(getProject.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = null;
        state.portfolioErrorMessage = '';
        state.project = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getPortfolio.pending,
          getProjectsBy.pending,
          getProject.pending
        ),
        (state) => {
          state.portfolioLoading = true;
          state.portfolioError = null;
          state.portfolioErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(
          getPortfolio.rejected,
          getProjectsBy.rejected,
          getProject.rejected
        ),
        (state, action) => {
          state.portfolioLoading = false;
          state.portfolioError = (action.error as Error) || null;
          state.portfolioErrorMessage = action.error.message || '';
        }
      );
  },
});

export default portfolioSlice;
