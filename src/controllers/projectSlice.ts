import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
  collection,
  doc,
  getDoc,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import { db } from '../services/firebase/config';

import { getRepoDetails } from './githubSlice';

import Repo from '@/model/Repo';
import GitHubRepoQuery from '@/model/GitHubRepoQuery';
import Project from '@/model/Project';

const portfolioCollection: CollectionReference<DocumentData, DocumentData> =
  collection(db, 'portfolio');

interface ProjectState {
  projectLoading: boolean;
  projectError: Error | null;
  projectErrorMessage: string;
  projectObject: Record<string, any> | null;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectError: null,
  projectErrorMessage: '',
  projectObject: null,
};

export const getProject = createAsyncThunk(
  'project/getProject',
  async (query: GitHubRepoQuery, thunkAPI) => {
    try {
      const project = new Project();

      const repoDetailsResponse = await thunkAPI.dispatch(
        getRepoDetails(query)
      );

      if (
        getRepoDetails.fulfilled.match(repoDetailsResponse) &&
        repoDetailsResponse.payload
      ) {
        const repo = new Repo(repoDetailsResponse.payload);
        project.fromRepo(repo)
      }

      // const docRef: DocumentReference = doc(portfolioCollection, query.repo);
      // const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
      //   await getDoc(docRef);

      // if (docSnap.exists()) {
      //   project.fromDocumentData(docSnap.id, docSnap.data())
      // }

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
        state.projectObject = action.payload;
      })
      .addCase(getProject.pending, (state) => {
        state.projectLoading = true;
        state.projectError = null;
        state.projectErrorMessage = '';
      })
      .addCase(getProject.rejected, (state, action) => {
        state.projectLoading = false;
        state.projectError = (action.error as Error) || null;
        state.projectErrorMessage = action.error.message || '';
      });
  },
});

export default projectSlice;
