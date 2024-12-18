import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

const db = window.db;
const collection = window.collection;
const getDocs = window.getDocs;

const initialState = {
  taxonomiesLoading: false,
  taxonomiesError: '',
  taxonomiesErrorMessage: '',
  taxonomiesStatusCode: '',
  projects: '',
  projectTypes: '',
  projectType: '',
  languages: '',
  language: '',
  skills: '',
  skill: '',
  frameworks: '',
  framework: '',
  technologies: '',
  technology: '',
  description: '',
  icon: '',
  title: '',
  url: '',
  projects: ''
};

export const getProjectTypes = createAsyncThunk('taxonomies/getProjectTypes', async () => {
  try {
    const querySnapshot = await window.getDocs(window.collection(window.db, "projectTypes"));

    let projectTypes = [];

    querySnapshot.forEach((doc) => {
      projectTypes.push(doc.data());
    });

    return projectTypes;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getLanguages = createAsyncThunk('taxonomies/getLanguages', async () => {
  try {
    const querySnapshot = await window.getDocs(window.collection(window.db, "languages"));

    let languages = [];

    querySnapshot.forEach((doc) => {
      languages.push(doc.data());
    });

    return languages;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getFrameworks = createAsyncThunk('taxonomies/getFrameworks', async () => {
  try {
    const querySnapshot = await window.getDocs(window.collection(window.db, "frameworks"));

    let frameworks = [];

    querySnapshot.forEach((doc) => {
      frameworks.push(doc.data());
    });
    
    return frameworks;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getTechnologies = createAsyncThunk('taxonomies/getTechnologies', async () => {
  try {
    const querySnapshot = await window.getDocs(window.collection(window.db, "technologies"));

    let technologies = [];

    querySnapshot.forEach((doc) => {
      technologies.push(doc.data());
    });

    return technologies;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getProjectType = createAsyncThunk('taxonomies/getProjectType', async (projectType) => {
  try {
    const response = await fetch(`/wp-json/seven-tech/communications/v1/taxonomies/project-types/${projectType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getSkill = createAsyncThunk('taxonomies/getSkill', async (skill) => {
  try {
    const response = await fetch(`/wp-json/seven-tech/communications/v1/taxonomies/skills/${skill}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});


export const getFramework = createAsyncThunk('taxonomies/getFramework', async (framework) => {
  try {
    const response = await fetch(`/wp-json/seven-tech/communications/v1/taxonomies/frameworks/${framework}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getTechnology = createAsyncThunk('taxonomies/getTechnology', async (technology) => {
  try {
    const response = await fetch(`/wp-json/seven-tech/communications/v1/taxonomies/technologies/${technology}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const taxonomiesSlice = createSlice({
  name: 'taxonomies',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProjectTypes.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = action.payload.errorMessage;
        state.taxonomiesStatusCode = action.payload.statusCode;
        state.projectTypes = action.payload;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = action.payload.errorMessage;
        state.taxonomiesStatusCode = action.payload.statusCode;
        state.languages = action.payload;
      })
      .addCase(getFrameworks.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = action.payload.errorMessage;
        state.taxonomiesStatusCode = action.payload.statusCode;
        state.frameworks = action.payload;
      })
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = action.payload.errorMessage;
        state.taxonomiesStatusCode = action.payload.statusCode;
        state.technologies = action.payload;
      })
      .addMatcher(isAnyOf(
        getProjectType.fulfilled,
        getSkill.fulfilled,
        getFramework.fulfilled,
        getTechnology.fulfilled
      ), (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = action.payload.errorMessage;
        state.taxonomiesStatusCode = action.payload.statusCode;
        state.description = action.payload.description;
        state.icon = action.payload.icon;
        state.title = action.payload.title;
        state.url = action.payload.url;
        state.projects = action.payload.projects;
      })
      .addMatcher(isAnyOf(
        getProjectTypes.pending,
        getFrameworks.pending,
        getTechnologies.pending,
        getProjectType.pending,
        getSkill.pending,
        getFramework.pending,
        getTechnology.pending
      ), (state) => {
        state.taxonomiesLoading = true;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.taxonomiesStatusCode = '';
      })
      .addMatcher(isAnyOf(
        getProjectTypes.rejected,
        getFrameworks.rejected,
        getTechnologies.rejected,
        getProjectType.rejected,
        getSkill.rejected,
        getFramework.rejected,
        getTechnology.rejected
      ), (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = action.error;
        state.taxonomiesErrorMessage = action.error.message;
        state.taxonomiesStatusCode = action.error.code;
      })
  }
})

export default taxonomiesSlice;
