import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

import { db } from '../services/firebase/config';

import Project from '../model/Project.ts';

const portfolioCollection = collection(db, 'portfolio');

const initialState = {
  portfolioLoading: false,
  portfolioError: '',
  portfolioErrorMessage: '',
  portfolio: '',
  projects: '',
  project: ''
};

export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async () => {
  try {
    const querySnapshot = await getDocs(portfolioCollection);

    if (querySnapshot.length === 0) {
      throw new Error('No projects found.');
    }

    let portfolio = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      const project = new Project(data);
      project.id = doc.id;
      portfolio.push(project);
    });

    return portfolio;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getProjectsBy = createAsyncThunk('portfolio/getProjectsBy', async (params) => {
  try {
    const contentCollection = collection(db, 'portfolio');
    const projectQuery = query(
      contentCollection,
      where(params.taxonomy, 'array-contains', params.term)
    );
    const querySnapshot = await getDocs(projectQuery);
    const docs = querySnapshot.docs;

    if (docs.length === 0) {
      throw new Error('No projects found.');
    }

    let projects = [];

    docs.forEach((doc) => {
      let data = doc.data();
      const project = new Project(data);
      project.id = doc.id;

      projects.push(project);
    });

    return projects;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getProject = createAsyncThunk('portfolio/getProject', async (projectID) => {
  try {
    const docRef = doc(portfolioCollection, projectID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Could not be found.");
    }

    let data = docSnap.data();
    const project = new Project(data);
    project.id = docSnap.id;

    return project;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = '';
        state.portfolioErrorMessage = '';
        state.portfolio = action.payload;
      })
      .addCase(getProjectsBy.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = '';
        state.portfolioErrorMessage = '';
        state.projects = action.payload;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = '';
        state.portfolioErrorMessage = '';
        state.project = action.payload;
      })
      .addMatcher(isAnyOf(
        getPortfolio.pending,
        getProjectsBy.pending,
        getProject.pending
      ), (state) => {
        state.portfolioLoading = true;
        state.portfolioError = '';
        state.portfolioErrorMessage = '';
      })
      .addMatcher(isAnyOf(
        getPortfolio.rejected,
        getProjectsBy.rejected,
        getProject.rejected
      ), (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.error;
        state.portfolioErrorMessage = action.error.message;
      })
  }
})

export default portfolioSlice;
