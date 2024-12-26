import {
  createSlice,
  createAsyncThunk,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

interface AboutState {
  aboutLoading: boolean;
  aboutStatusCode: string | null;
  aboutError: Error | null;
  aboutErrorMessage: string;
  missionStatement: string;
}

const initialState: AboutState = {
  aboutLoading: false,
  aboutStatusCode: '',
  aboutError: null,
  aboutErrorMessage: '',
  missionStatement: '',
};

export const getMissionStatement = createAsyncThunk(
  'about/getMissionStatement',
  async (pageSlug) => {
    try {
      const response = await fetch(
        `/wp-json/seven-tech/v1/about/mission-statement`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
);

const aboutSliceOptions: CreateSliceOptions<AboutState> = {
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMissionStatement.pending, (state) => {
        state.aboutLoading = true;
        state.aboutStatusCode = '';
        state.aboutError = null;
        state.aboutErrorMessage = '';
      })
      .addCase(getMissionStatement.fulfilled, (state, action) => {
        state.aboutLoading = false;
        state.aboutStatusCode = action.payload.statusCode;
        state.aboutError = null;
        state.aboutErrorMessage = '';
        state.missionStatement = action.payload.missionStatement;
      })
      .addCase(getMissionStatement.rejected, (state, action) => {
        state.aboutLoading = false;
        state.aboutStatusCode = action.error.code || '';
        state.aboutError = action.error as Error || null;
        state.aboutErrorMessage = action.error.message || '';
      });
  },
};

export const aboutSlice = createSlice(aboutSliceOptions);

export default aboutSlice;
