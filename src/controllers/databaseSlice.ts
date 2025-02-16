import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

interface DatabaseState {
  databaseLoading: boolean;
  databaseStatusCode: string;
  databaseError: Error | null;
  databaseErrorMessage: string;
  title: string;
  avatarURL: string;
  authorURL: string;
  fullName: string;
  bio: string;
  resume: string;
  content: Array<string> | null;
  userObject: Record<string, any> | null;
  organizations: [];
  repos: [];
  socialAccounts: [];
  userDataObject: Record<string, any> | null;
  organizationDataObject: Record<string, any> | null;
}

const initialState: DatabaseState = {
  databaseLoading: false,
  databaseStatusCode: '',
  databaseError: null,
  databaseErrorMessage: '',
  title: '',
  avatarURL: '',
  authorURL: '',
  fullName: '',
  bio: '',
  resume: '',
  content: null,
  userObject: {},
  organizations: [],
  repos: [],
  socialAccounts: [],
  userDataObject: null,
  organizationDataObject: null,
};

const api = import.meta.env.VITE_FIREBASE_API_URL ?? 'http://127.0.0.1:5001/portfolio-bec7d/us-central1/default';

export const getUserData = createAsyncThunk(
  'database/getUserData',
  async (username: string) => {
    try {
      const response = await fetch(`${api}/user/${username}`, {
        method: 'GET',
      });

      const text = await response.text();

      if (!text) {
        return null;
      }

      const data = JSON.parse(text); // Parse JSON manually

      return data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationData = createAsyncThunk(
  'database/getOrganizationData',
  async (organization: string) => {
    try {
      const response = await fetch(`${api}/organization/${organization}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch project data: ${response.statusText}`);
      }

      const text = await response.text();

      if (!text) {
        return null;
      }

      const data = JSON.parse(text); // Parse JSON manually

      return data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getProjectData = createAsyncThunk(
  'database/getProjectData',
  async (projectID: string) => {
    try {
      const response = await fetch(`${api}/project/${projectID}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch project data: ${response.statusText}`);
      }

      const text = await response.text();

      if (!text) {
        return null;
      }

      const data = JSON.parse(text); // Parse JSON manually

      return data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const databaseSliceOptions: CreateSliceOptions<DatabaseState> = {
  name: 'database',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.databaseLoading = false;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.userDataObject = action.payload;
      })
      .addCase(getOrganizationData.fulfilled, (state, action) => {
        state.databaseLoading = false;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.organizationDataObject = action.payload;
      })
      .addMatcher(
        isAnyOf(getUserData.pending, getOrganizationData.pending),
        (state) => {
          state.databaseLoading = true;
          state.databaseErrorMessage = '';
          state.databaseError = null;
        }
      )
      .addMatcher(
        isAnyOf(getUserData.rejected, getOrganizationData.rejected),
        (state, action) => {
          state.databaseLoading = false;
          state.databaseErrorMessage = action.error.message || '';
          state.databaseError = action.error as Error;
        }
      );
  },
};

export const databaseSlice = createSlice(databaseSliceOptions);

export default databaseSlice;
