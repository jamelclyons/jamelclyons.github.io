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

interface ProjectState {
  projectLoading: boolean;
  projectError: Error | null;
  projectErrorMessage: string;
  project: Project | null;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectError: null,
  projectErrorMessage: '',
  project: null,
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
        state.project = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getProject.pending
        ),
        (state) => {
          state.projectLoading = true;
          state.projectError = null;
          state.projectErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(
          getProject.rejected
        ),
        (state, action) => {
          state.projectLoading = false;
          state.projectError = (action.error as Error) || null;
          state.projectErrorMessage = action.error.message || '';
        }
      );
  },
});

export default projectSlice;
