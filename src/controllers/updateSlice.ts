import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import {
  collection,
  updateDoc,
  doc,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';

import { db, api } from '../services/firebase/config';

import ProjectSolution from '../model/ProjectSolution';
import ProjectProcess from '../model/ProjectProcess';
import ProjectProblem from '../model/ProjectProblem';
import ProjectDetails from '../model/ProjectDetails';
import DBProject from '@/model/DBProject';
import SecureHeaders from '@/model/SecureHeaders';

import { addSecureHeaders } from '@/utilities/Headers';

interface UpdateState {
  updateLoading: boolean;
  updateSuccessMessage: string | null;
  updateError: Error | null;
  updateErrorMessage: string| null;
  updateStatusCode: number | null;
  solution: ProjectSolution | null;
  process: ProjectProcess | null;
  problem: ProjectProblem | null;
  details: ProjectDetails | null;
}

const initialState: UpdateState = {
  updateLoading: false,
  updateSuccessMessage: null,
  updateError: null,
  updateErrorMessage: null,
  updateStatusCode: null,
  solution: null,
  process: null,
  problem: null,
  details: null,
};

const projectCollection: CollectionReference<DocumentData, DocumentData> =
  collection(db, 'portfolio');

export const updateProject = createAsyncThunk(
  'update/updateProject',
  async (project: DBProject) => {
    try {
      const headers: SecureHeaders
        = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${project.id}`, {
        method: 'POST',
        headers: headers instanceof SecureHeaders ? new Headers(headers.toObject()) : {},
        body: JSON.stringify(project.toObject()),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      err.stack
      throw new Error(err.message);
    }
  }
);

export const updateSolution = createAsyncThunk(
  'update/updateSolution',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        solution: data.solution,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProcess = createAsyncThunk(
  'update/updateProcess',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        process: data.process,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  'update/updateStatus',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        status: data.status,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDesign = createAsyncThunk(
  'update/updateDesign',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        design: data.design,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDevelopment = createAsyncThunk(
  'update/updateDevelopment',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        development: data.development,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDelivery = createAsyncThunk(
  'update/updateDelivery',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        delivery: data.delivery,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProblem = createAsyncThunk(
  'update/updateProblem',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        problem: data.problem,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateDetails = createAsyncThunk(
  'update/updateDetails',
  async (data: Record<string, any>) => {
    try {
      await updateDoc(doc(projectCollection, data.id), {
        details: data.details,
      });

      return `Project with the #ID: ${data.id} was updated.`;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const updateSliceOptions: CreateSliceOptions<UpdateState> = {
  name: 'update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          updateProject.fulfilled,
          updateSolution.fulfilled,
          updateProcess.fulfilled,
          updateProblem.fulfilled,
          updateDetails.fulfilled
        ),
        (state, action) => {
          state.updateLoading = false;
          state.updateStatusCode = action.payload?.status_code ?? null;
          state.updateErrorMessage = action.payload?.error_message ?? null;
          state.updateSuccessMessage = action.payload?.success_message ?? null;
        }
      )
      .addMatcher(
        isAnyOf(
          updateProject.pending,
          updateSolution.pending,
          updateProcess.pending,
          updateProblem.pending,
          updateDetails.pending
        ),
        (state) => {
          state.updateLoading = true;
          state.updateError = null;
          state.updateErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(
          updateProject.rejected,
          updateSolution.rejected,
          updateProcess.rejected,
          updateProblem.rejected,
          updateDetails.rejected
        ),
        (state, action) => {
          state.updateLoading = false;
          state.updateError = (action.error as Error) || null;
          state.updateErrorMessage = action.error.message || '';
        }
      );
  },
};

export const updateSlice = createSlice(updateSliceOptions);

export default updateSlice;
