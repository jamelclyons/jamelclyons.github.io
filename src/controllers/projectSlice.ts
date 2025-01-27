import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

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

import Repo from '../model/Repo';

const portfolioCollection: CollectionReference<DocumentData, DocumentData> =
  collection(db, 'portfolio');

interface ProjectState {
  projectLoading: boolean;
  projectError: Error | null;
  projectErrorMessage: string;
  projectObject: Record<string, any>;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectError: null,
  projectErrorMessage: '',
  projectObject: {},
};

export const getProject = createAsyncThunk(
  'project/getProject',
  async (repo: Repo) => {
    try {
      const docRef: DocumentReference = doc(portfolioCollection, repo.id);
      const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
        await getDoc(docRef);

      if (!docSnap.exists()) {
        return {};
      }

      return { id: docSnap.id, ...docSnap.data() };
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
