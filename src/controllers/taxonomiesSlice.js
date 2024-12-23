import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

import { db } from '../services/firebase/config';
import Taxonomy from '../model/Taxonomy';

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
  frameworks: '',
  framework: '',
  technologies: '',
  technology: '',
};

export const getProjectTypes = createAsyncThunk('taxonomies/getProjectTypes', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projectTypes"));

    let projectTypes = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let taxonomy = new Taxonomy(doc.id, 'project-types', data.title, data.icon_url, data.class_name).toObject();
      projectTypes.push(taxonomy);
    });

    return projectTypes;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getLanguages = createAsyncThunk('taxonomies/getLanguages', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "languages"));

    let languages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let taxonomy = new Taxonomy(doc.id, 'languages', data.title, data.icon_url, data.class_name).toObject();
      languages.push(taxonomy);
    });

    return languages;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getFrameworks = createAsyncThunk('taxonomies/getFrameworks', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "frameworks"));

    let frameworks = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let taxonomy = new Taxonomy(doc.id, 'frameworks', data.title, data.icon_url, data.class_name).toObject();
      frameworks.push(taxonomy);
    });

    return frameworks;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getTechnologies = createAsyncThunk('taxonomies/getTechnologies', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "technologies"));

    let technologies = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let taxonomy = new Taxonomy(doc.id, 'technologies', data.title, data.icon_url, data.class_name).toObject();
      technologies.push(taxonomy);
    });

    return technologies;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getProjectType = createAsyncThunk('taxonomies/getProjectType', async (projectType) => {
  try {
    const projectTypeCollection = collection(db, 'projectTypes');
    const docRef = doc(projectTypeCollection, projectType);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Could not be found.");
    }

    let data = docSnap.data();
    const taxonomy = new Taxonomy(docSnap.id, 'projectTypes', data.title, data.icon_url, data.class_name).toObject();

    return taxonomy;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getLanguage = createAsyncThunk('taxonomies/getLanguage', async (language) => {
  try {
    const languageCollection = collection(db, 'languages');
    const docRef = doc(languageCollection, language);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Could not be found.");
    }

    let data = docSnap.data();
    const taxonomy = new Taxonomy(docSnap.id, 'languages', data.title, data.icon_url, data.class_name).toObject();

    return taxonomy;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});


export const getFramework = createAsyncThunk('taxonomies/getFramework', async (framework) => {
  try {
    const frameworkCollection = collection(db, 'frameworks');
    const docRef = doc(frameworkCollection, framework);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Could not be found.");
    }

    let data = docSnap.data();
    const taxonomy = new Taxonomy(docSnap.id, 'frameworks', data.title, data.icon_url, data.class_name).toObject();

    return taxonomy;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getTechnology = createAsyncThunk('taxonomies/getTechnology', async (technology) => {
  try {
    const technologyCollection = collection(db, 'technologies');
    const docRef = doc(technologyCollection, technology);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Could not be found.");
    }

    let data = docSnap.data();
    const taxonomy = new Taxonomy(docSnap.id, 'technologies', data.title, data.icon_url, data.class_name).toObject();

    return taxonomy;
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
        state.taxonomiesErrorMessage = '';
        state.projectTypes = action.payload;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.languages = action.payload;
      })
      .addCase(getFrameworks.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.frameworks = action.payload;
      })
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.technologies = action.payload;
      })
      .addCase(getProjectType.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.project_type = action.payload;
      }).addCase(getLanguage.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.language = action.payload;
      }).addCase(getFramework.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.framework = action.payload;
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = '';
        state.taxonomiesErrorMessage = '';
        state.technology = action.payload;
      })
      .addMatcher(isAnyOf(
        getProjectTypes.pending,
        getFrameworks.pending,
        getTechnologies.pending,
        getProjectType.pending,
        getLanguage.pending,
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
        getLanguage.rejected,
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
