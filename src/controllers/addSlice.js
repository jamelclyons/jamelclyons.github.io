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

    const addDocument = await setDoc(doc(projectCollection, project.id), project);

    return addDocument;
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
      .addCase(addProject.fulfilled, (state, action) => {
        state.addLoading = false;
       
      })
      .addMatcher(isAnyOf(
        addProject.pending
      ), (state) => {
        state.addLoading = true;
        state.addError = '';
        state.addErrorMessage = '';
        state.addStatusCode = '';
      })
      .addMatcher(isAnyOf(
        addProject.rejected
      ), (state, action) => {
        state.addLoading = false;
        state.addError = action.error;
        state.addErrorMessage = action.error.message;
        state.addStatusCode = action.error.code;
      })
  }
})

export default addSlice;