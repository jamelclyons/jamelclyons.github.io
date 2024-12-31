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
  async (project: Record<string, any>) => {
    try {
      const projectCollection = collection(db, 'portfolio');

      await setDoc(doc(projectCollection, project.id), project);

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
      const projectType = taxonomy.toObject();

      await setDoc(doc(projectTypeCollection, projectType.id), projectType);

      return `${projectType.id} was added to projectTypes`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addLanguage = createAsyncThunk(
  'add/addLanguage',
  async (language: Taxonomy) => {
    try {
      const languageCollection = collection(db, 'languages');

      await setDoc(doc(languageCollection, language.id), language);

      return `${language.id} was added to languages`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addFramework = createAsyncThunk(
  'add/addFramework',
  async (framework: Taxonomy) => {
    try {
      const frameworkCollection = collection(db, 'frameworks');

      await setDoc(doc(frameworkCollection, framework.id), framework);

      return `${framework.id} was added to frameworks`;
    } catch (error) {
      const err = error as Error;

      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const addTechnology = createAsyncThunk<string, Taxonomy>(
  'add/addTechnology',
  async (technology: Taxonomy) => {
    try {
      const technologyCollection = collection(db, 'technologies');

      await setDoc(doc(technologyCollection, technology.id), technology);

      return `${technology.id} was added to technologies`;
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
