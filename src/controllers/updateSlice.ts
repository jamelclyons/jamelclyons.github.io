import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { api } from '@/services/firebase/config';

import DBProject from '@/model/DBProject';
import SecureHeaders from '@/model/SecureHeaders';
import Gallery from '@/model/Gallery';

import { addSecureHeaders } from '@/utilities/Headers';

interface UpdateState {
  updateLoading: boolean;
  updateSuccessMessage: string | null;
  updateError: Error | null;
  updateErrorMessage: string | null;
  updateStatusCode: number | null;
  updatedGallery: Record<string, any> | null;
}

const initialState: UpdateState = {
  updateLoading: false,
  updateSuccessMessage: null,
  updateError: null,
  updateErrorMessage: null,
  updateStatusCode: null,
  updatedGallery: null,
};

export const updateProject = createAsyncThunk(
  'update/updateProject',
  async (project: DBProject) => {
    try {
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${project.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(project.toObject()),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      err.stack;
      throw new Error(err.message);
    }
  }
);

export const updateSolution = createAsyncThunk(
  'update/updateSolution',
  async (data: Record<string, any>) => {
    try {
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
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
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
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
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
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
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
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
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
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
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
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
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
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
      const headers: SecureHeaders = await addSecureHeaders();

      if (headers.errorMessage) {
        return headers;
      }

      const response = await fetch(`${api}/project/${data?.id}`, {
        method: 'POST',
        headers:
          headers instanceof SecureHeaders
            ? new Headers(headers.toObject())
            : {},
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateGallery = createAsyncThunk(
  'update/updateGallery',
  async (gallery: Gallery) => {
    try {
      return gallery.toObject();
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
      .addCase(updateGallery.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedGallery = action.payload;
      })
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
          updateGallery.pending,
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
          updateGallery.rejected,
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
