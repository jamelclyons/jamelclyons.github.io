import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { api } from '@/services/firebase/config';

import SecureHeaders from '@/model/SecureHeaders';
import Gallery from '@/model/Gallery';
import Project from '@/model/Project';

import { addSecureHeaders } from '@/utilities/Headers';
import Skills from '@/model/Skills';
import ProjectSkills from '@/model/ProjectSkills';
import { TaskObject } from '@/model/Task';
import ProjectVersions from '@/model/ProjectVersions';

interface UpdateState {
  updateLoading: boolean;
  updateLoadingMessage: string | null;
  updateSuccessMessage: string | null;
  updateError: Error | null;
  updateErrorMessage: string | null;
  updateStatusCode: number | null;
  updatedGallery: Record<string, any> | null;
  updatedSkills: Record<string, any> | null;
  updatedProjectSkills: Record<string, any> | null;
  updatedCheckList: Array<Record<string, any>> | null;
  updatedVersionsList: Record<string, any> | null;
}

const initialState: UpdateState = {
  updateLoading: false,
  updateLoadingMessage: null,
  updateSuccessMessage: null,
  updateError: null,
  updateErrorMessage: null,
  updateStatusCode: null,
  updatedGallery: null,
  updatedSkills: null,
  updatedProjectSkills: null,
  updatedCheckList: null,
  updatedVersionsList: null,
};

export const updateProject = createAsyncThunk(
  'update/updateProject',
  async (project: Project) => {
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

export const updateSkills = createAsyncThunk(
  'update/updateSkills',
  async (skills: Skills) => {
    try {
      return skills.toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateProjectSkills = createAsyncThunk(
  'update/updateProjectSkills',
  async (skills: ProjectSkills) => {
    try {
      return skills.toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateCheckList = createAsyncThunk(
  'update/updateCheckList',
  async (list: Array<TaskObject>) => {
    try {
      return list as Array<Record<string,any>>;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const updateVersionsList = createAsyncThunk(
  'update/updateVersionsList',
  async (versions: ProjectVersions) => {
    try {
      return versions.toObject();
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
      .addCase(updateCheckList.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Check list updated';
      })
      .addCase(updateCheckList.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedGallery = action.payload;
      })
      .addCase(updateVersionsList.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Version list updated';
      })
      .addCase(updateVersionsList.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedGallery = action.payload;
      })
      .addCase(updateGallery.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Gallery updated';
      })
      .addCase(updateGallery.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedGallery = action.payload;
      })
      .addCase(updateProjectSkills.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Skills updated';
      })
      .addCase(updateProjectSkills.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updatedProjectSkills = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage = 'Attempting to update the your project...';
      })
      .addCase(updateSolution.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the solution section of your project...';
      })
      .addCase(updateProcess.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the process section of your project...';
      })
      .addCase(updateProblem.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the problem section of your project...';
      })
      .addCase(updateDetails.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateErrorMessage = '';
        state.updateLoadingMessage =
          'Attempting to update the details section of your project...';
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
