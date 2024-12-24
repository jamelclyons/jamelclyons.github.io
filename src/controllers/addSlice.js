import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

import { db } from '../services/firebase/config';

const initialState = {
  addLoading: false,
  addSuccessMessage: '',
  addError: '',
  addErrorMessage: '',
  addStatusCode: '',
  portfolio: '',
  projects: '',
  title: '',
  description: '',
  features: '',
  currency: '',
  price: '',
  solution_gallery: '',
  project_urls: '',
  project_details: '',
  the_solution: '',
  the_problem: '',
  project_team: '',
  project_types: '',
  skills: '',
  frameworks: '',
  technologies: ''
};

export const addProject = createAsyncThunk('add/addProject', async (project) => {
  try {
    const projectCollection = collection(db, "portfolio");

    await setDoc(doc(projectCollection, project.id), project);

    return { success_message: `${project.id} was added to portfolio` };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const addProjectType = createAsyncThunk('add/addProjectType', async (taxonomy) => {
  try {
    const projectTypeCollection = collection(db, "project_types");
    const projectType = taxonomy.toObject();

    await setDoc(doc(projectTypeCollection, projectType.id), projectType);

    return { success_message: `${projectType.id} was added to projectTypes` };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const addLanguage = createAsyncThunk('add/addLanguage', async (language) => {
  try {
    const languageCollection = collection(db, "languages");

    await setDoc(doc(languageCollection, language.id), language);

    return { success_message: `${language.id} was added to languages` };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const addFramework = createAsyncThunk('add/addFramework', async (framework) => {
  try {
    const frameworkCollection = collection(db, "frameworks");

    await setDoc(doc(frameworkCollection, framework.id), framework);

    return { success_message: `${framework.id} was added to frameworks` };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const addTechnology = createAsyncThunk('add/addTechnology', async (technology) => {
  try {
    const technologyCollection = collection(db, "technologies");

    await setDoc(doc(technologyCollection, technology.id), technology);

    return { success_message: `${technology.id} was added to technologies` };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const addSlice = createSlice({
  name: 'add',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(
        addProject.fulfilled,
        addProjectType.fulfilled,
        addLanguage.fulfilled,
        addFramework.fulfilled,
        addTechnology.fulfilled),
        (state, action) => {
          state.addLoading = false;
          state.addSuccessMessage = action.payload.success_message;
        })
      .addMatcher(isAnyOf(
        addProject.pending,
        addProjectType.pending,
        addLanguage.pending,
        addFramework.pending,
        addTechnology.pending
      ), (state) => {
        state.addLoading = true;
        state.addError = '';
        state.addErrorMessage = '';
      })
      .addMatcher(isAnyOf(
        addProject.rejected,
        addProjectType.rejected,
        addLanguage.rejected,
        addFramework.rejected,
        addTechnology.rejected
      ), (state, action) => {
        state.addLoading = false;
        state.addError = action.error;
        state.addErrorMessage = action.error.message;
      })
  }
})

export default addSlice;