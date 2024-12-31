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
import ProjectSolution from '../model/ProjectSolution';
import ProjectProcess from '../model/ProjectProcess';
import ProjectProblem from '../model/ProjectProblem';
import ProjectDesign from '../model/ProjectDesign';
import ProjectDevelopment from '../model/ProjectDevelopment';
import ProjectDelivery from '../model/ProjectDelivery';
import Repo from '../model/Repo';

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

function getProjectFromObject(doc: DocumentData, repo?: Repo): Project {
  const data = doc.data() as Record<string, any>;

  const design = new ProjectDesign(data.process.design);
  const development = new ProjectDevelopment(data.process.development);
  const delivery = new ProjectDelivery(data.process.delivery);

  const project = new Project({
    'id': doc.id,
    'title': data.title,
    'description': data.description,
    'homepage': data.homepage,
    'urlsList': data.urlsList,
    'solution': new ProjectSolution(data.solution),
    'process': new ProjectProcess(data.process.status, design, development, delivery),
    'problem': new ProjectProblem(data.problem),
    'types': data.types,
    'languages': data.languages,
    'frameworks': data.frameworks,
    'technologies': data.technologies,
    'details': data.details}
  );

  if (repo) {
    project.fromRepo(repo);
  }

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
        const project: Project = getProjectFromObject(doc);
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

export const getProject = createAsyncThunk(
  'portfolio/getProject',
  async (repo: Repo) => {
    try {
      const docRef = doc(portfolioCollection, repo.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        let project = new Project();
        project.fromRepo(repo);

        return project;
      }

      return getProjectFromObject(docSnap, repo);
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
