import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  QuerySnapshot,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
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

const portfolioCollection: CollectionReference<DocumentData, DocumentData> =
  collection(db, 'portfolio');

interface ProjectState {
  projectLoading: boolean;
  projectError: Error | null;
  projectErrorMessage: string;
  project: Record<string, any>;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectError: null,
  projectErrorMessage: '',
  project: {},
};

export const getProject = createAsyncThunk(
  'project/getProject',
  async (repo: Repo) => {
    try {
      const docRef: DocumentReference = doc(portfolioCollection, repo.id);
      const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
        await getDoc(docRef);

      let project = new Project();

      project.fromRepo(repo);

      if (docSnap.exists()) {
        project.fromDocumentData(docSnap.id, docSnap.data());
      }

      project.solution.gallery.toObject();
      project.solution.urlsList.toObject();
      project.solution.toObject();

      project.process.status.toObject();
      project.process.design.toObject();
      project.process.development.toObject();
      project.process.delivery.toObject();

      project.problem.gallery.toObject();

      return project.toObject();
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
      .addCase(getProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.projectLoading = false;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.project = action.payload;
      })
      .addCase(getProject.pending, (state) => {
        state.projectLoading = true;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.project = {};
      })
      .addCase(getProject.rejected, (state, action) => {
        state.projectLoading = false;
        state.projectError = (action.error as Error) || null;
        state.projectErrorMessage = action.error.message || '';
      });
  },
});

export default projectSlice;
