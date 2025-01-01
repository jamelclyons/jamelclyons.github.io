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

import ProjectSolution from '../model/ProjectSolution';
import ProjectProcess from '../model/ProjectProcess';
import ProjectProblem from '../model/ProjectProblem';
import ProjectDetails from '../model/ProjectDetails';
import Project from '../model/Project';
import Repo from '../model/Repo';
import ProjectStatus from '../model/ProjectStatus';
import ProjectDesign from '../model/ProjectDesign';
import ProjectDevelopment from '../model/ProjectDevelopment';
import ProjectDelivery from '../model/ProjectDelivery';

const portfolioCollection = collection(db, 'portfolio');

interface ProjectState {
  projectLoading: boolean;
  projectError: Error | null;
  projectErrorMessage: string;
  id: string;
  title: string;
  description: string;
  solution: ProjectSolution | null;
  process: ProjectProcess | null;
  status: ProjectStatus | null;
  design: ProjectDesign | null;
  development: ProjectDevelopment | null;
  delivery: ProjectDelivery | null;
  problem: ProjectProblem | null;
  details: ProjectDetails | null;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectError: null,
  projectErrorMessage: '',
  id: '',
  title: '',
  description: '',
  solution: null,
  process: null,
  status: null,
  design: null,
  development: null,
  delivery: null,
  problem: null,
  details: null,
};

export const getProject = createAsyncThunk(
  'project/getProject',
  async (repo: Repo) => {
    try {
      const docRef = doc(portfolioCollection, repo.id);
      const docSnap = await getDoc(docRef);

      let project = new Project();

      if (!docSnap.exists()) {
        project.fromRepo(repo);

        return project;
      }

      project.fromDocumentData(docSnap);

      return project;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.id = action.payload.id;
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.solution = action.payload.solution;
        state.status = action.payload.process.status;
        state.design = action.payload.process.design;
        state.development = action.payload.process.development;
        state.delivery = action.payload.process.delivery;
        state.problem = action.payload.problem;
        state.details = action.payload.details;
      })
      .addMatcher(isAnyOf(getProject.pending), (state) => {
        state.projectLoading = true;
        state.projectError = null;
        state.projectErrorMessage = '';
      })
      .addMatcher(isAnyOf(getProject.rejected), (state, action) => {
        state.projectLoading = false;
        state.projectError = (action.error as Error) || null;
        state.projectErrorMessage = action.error.message || '';
      });
  },
});

export default projectSlice;
