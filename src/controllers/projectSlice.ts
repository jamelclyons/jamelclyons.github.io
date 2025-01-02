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
  solution: ProjectSolution;
  process: ProjectProcess;
  status: ProjectStatus;
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;
  problem: ProjectProblem;
  details: ProjectDetails;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectError: null,
  projectErrorMessage: '',
  id: '',
  title: '',
  description: '',
  solution: new ProjectSolution,
  process: new ProjectProcess,
  status: new ProjectStatus,
  design: new ProjectDesign,
  development: new ProjectDevelopment,
  delivery: new ProjectDelivery,
  problem: new ProjectProblem,
  details: new ProjectDetails,
};

export const getProject = createAsyncThunk(
  'project/getProject',
  async (repo: Repo) => {
    try {
      const docRef = doc(portfolioCollection, repo.id);
      const docSnap = await getDoc(docRef);

      let project = new Project();

      if (docSnap.exists()) {
        project.fromDocumentData(docSnap);
      }

      project.fromRepo(repo);

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
        state.process = action.payload.process;
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
