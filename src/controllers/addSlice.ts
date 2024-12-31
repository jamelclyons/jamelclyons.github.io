import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';

import db from '../services/firebase/config';

import Taxonomy from '../model/Taxonomy';
import Project from '../model/Project';

interface AddState {
  addLoading: boolean;
  addSuccessMessage: string;
  addError: Error | null;
  addErrorMessage: string;
  addStatusCode: string;
}

const initialState: AddState = {
  addLoading: false,
  addSuccessMessage: '',
  addError: null,
  addErrorMessage: '',
  addStatusCode: '',
};

export const addProject = createAsyncThunk(
  'add/addProject',
  async (project: Project) => {
    try {
      const projectCollection = collection(db, 'portfolio');

      await setDoc(doc(projectCollection, project.id), project.toObject);

      return `${project.id} was added to portfolio`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addProjectType = createAsyncThunk(
  'add/addProjectType',
  async (taxonomy: Taxonomy) => {
    try {
      const projectTypeCollection = collection(db, 'project_types');

      await setDoc(doc(projectTypeCollection, taxonomy.id), taxonomy.toObject());

      return `${taxonomy.id} was added to projectTypes`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addLanguage = createAsyncThunk(
  'add/addLanguage',
  async (taxonomy: Taxonomy) => {
    try {
      const languageCollection = collection(db, 'languages');

      await setDoc(doc(languageCollection, taxonomy.id), taxonomy.toObject());

      return `${taxonomy.id} was added to languages`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addFramework = createAsyncThunk(
  'add/addFramework',
  async (taxonomy: Taxonomy) => {
    try {
      const frameworkCollection = collection(db, 'frameworks');

      await setDoc(doc(frameworkCollection, taxonomy.id), taxonomy.toObject());

      return `${taxonomy.id} was added to frameworks`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addTechnology = createAsyncThunk<string, Taxonomy>(
  'add/addTechnology',
  async (taxonomy: Taxonomy) => {
    try {
      const technologyCollection = collection(db, 'technologies');

      await setDoc(doc(technologyCollection, taxonomy.id), taxonomy.toObject());

      return `${taxonomy.id} was added to technologies`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

const addSliceOptions: CreateSliceOptions<AddState> = {
  name: 'add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          addProject.fulfilled,
          addProjectType.fulfilled,
          addLanguage.fulfilled,
          addFramework.fulfilled,
          addTechnology.fulfilled
        ),
        (state, action) => {
          state.addLoading = false;
          state.addSuccessMessage = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          addProject.pending,
          addProjectType.pending,
          addLanguage.pending,
          addFramework.pending,
          addTechnology.pending
        ),
        (state) => {
          state.addLoading = true;
          state.addError = null;
          state.addErrorMessage = '';
        }
      )
      .addMatcher(
        isAnyOf(
          addProject.rejected,
          addProjectType.rejected,
          addLanguage.rejected,
          addFramework.rejected,
          addTechnology.rejected
        ),
        (state, action) => {
          state.addLoading = false;
          state.addError = (action.error as Error) || null;
          state.addErrorMessage = action.error.message || '';
        }
      );
  },
};

export const addSlice = createSlice(addSliceOptions);

export default addSlice;
