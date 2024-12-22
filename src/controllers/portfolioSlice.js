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

const portfolioCollection = collection(db, 'portfolio');

const initialState = {
  portfolioLoading: false,
  portfolioError: '',
  portfolioErrorMessage: '',
  portfolioStatusCode: '',
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
  languages: '',
  frameworks: '',
  technologies: ''
};

export const addProject = createAsyncThunk('portfolio/addProject', async () => {
  try {
    const querySnapshot = await getDocs(portfolioCollection);

    let portfolio = [];

    querySnapshot.forEach((doc) => {
      portfolio.push(doc.data());
    });

    return portfolio;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async () => {
  try {
    const querySnapshot = await getDocs(portfolioCollection);

    let portfolio = [];

    querySnapshot.forEach((doc) => {
      portfolio.push(doc.data());
    });

    return portfolio;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getProject = createAsyncThunk('portfolio/getProject', async (project) => {
  try {
    const docRef = doc(portfolioCollection, project);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Could not be found.");
    }

    return docSnap.data();
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

    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    return projects;
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
        state.portfolioErrorMessage = action.payload.errorMessage;
        state.portfolioStatusCode = action.payload.statusCode;
        state.portfolio = action.payload;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = '';
        state.portfolioErrorMessage = action.payload.errorMessage;
        state.portfolioStatusCode = action.payload.statusCode;
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.features = action.payload.features;
        state.currency = action.payload.currency;
        state.price = action.payload.price;
        state.solution_gallery = action.payload.solution_gallery;
        state.project_urls = action.payload.project_urls;
        state.project_details = action.payload.project_details;
        state.the_solution = action.payload.the_solution;
        state.the_problem = action.payload.the_problem;
        state.project_team = action.payload.project_team;
        state.project_types = action.payload.project_types;
        state.languages = action.payload.languages;
        state.frameworks = action.payload.frameworks;
        state.technologies = action.payload.technologies;
      })
      .addCase(getProjectsBy.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = '';
        state.portfolioErrorMessage = action.payload.errorMessage;
        state.portfolioStatusCode = action.payload.statusCode;
        state.projects = action.payload;
      })
      .addMatcher(isAnyOf(
        getPortfolio.pending,
        getProject.pending,
        getProjectsBy.pending,
      ), (state) => {
        state.portfolioLoading = true;
        state.portfolioError = '';
        state.portfolioErrorMessage = '';
        state.portfolioStatusCode = '';
      })
      .addMatcher(isAnyOf(
        getPortfolio.rejected,
        getProject.rejected,
        getProjectsBy.rejected,
      ), (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.error;
        state.portfolioErrorMessage = action.error.message;
        state.portfolioStatusCode = action.error.code;
      })
  }
})

export default portfolioSlice;
