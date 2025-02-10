import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getRepoDetails } from './githubSlice';
import { getProjectData } from './databaseSlice';

import Repo from '@/model/Repo';
import GitHubRepoQuery from '@/model/GitHubRepoQuery';
import Project from '@/model/Project';

interface ProjectState {
  projectLoading: boolean;
  projectPageLoading: boolean;
  projectError: Error | null;
  projectErrorMessage: string;
  projectObject: Record<string, any> | null;
  projectPageObject: Record<string, any> | null;
}

const initialState: ProjectState = {
  projectLoading: false,
  projectPageLoading: false,
  projectError: null,
  projectErrorMessage: '',
  projectObject: null,
  projectPageObject: null,
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
        project.fromRepo(new Repo(repoDetailsResponse.payload));
      }

      const projectDataResponse = await thunkAPI.dispatch(
        getProjectData(query.repo)
      );

      if (
        getProjectData.fulfilled.match(projectDataResponse) &&
        projectDataResponse.payload
      ) {
        project.fromDocumentData(
          projectDataResponse.payload.id,
          projectDataResponse.payload.data()
        );
      }
      return {
        ...project.toObject(),
        details: {
          ...project.details.toObject(),
          team_list: project.details.teamList.map((user) => user.toObject()),
        },
      };
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getProjectPage = createAsyncThunk(
  'project/getProjectPage',
  async (query: GitHubRepoQuery, thunkAPI) => {
    try {
      const projectResponse = await thunkAPI.dispatch(getProject(query));

      if (
        getProject.fulfilled.match(projectResponse) &&
        projectResponse.payload
      ) {
        return projectResponse.payload;
      }

      return null;
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
      })
      .addCase(getProjectPage.fulfilled, (state, action: PayloadAction<any>) => {
        state.projectLoading = false;
        state.projectError = null;
        state.projectErrorMessage = '';
        state.projectPageObject = action.payload;
      })
      .addCase(getProjectPage.pending, (state) => {
        state.projectPageLoading = true;
        state.projectError = null;
        state.projectErrorMessage = '';
      })
      .addCase(getProjectPage.rejected, (state, action) => {
        state.projectLoading = false;
        state.projectError = (action.error as Error) || null;
        state.projectErrorMessage = action.error.message || '';
      });
  },
});

export default projectSlice;
