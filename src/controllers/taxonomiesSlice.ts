import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  QuerySnapshot,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase/firestore';

import db from '../services/firebase/config';

import Taxonomy from '../model/Taxonomy';
import Project from '../model/Project';

interface TaxonomiesState {
  taxonomiesLoading: boolean;
  taxonomiesError: Error | null;
  taxonomiesErrorMessage: string;
  taxonomiesStatusCode: string;
  projectTypes: Set<Record<string, any>>;
  projectType: Record<string, any> | null;
  languages: Set<Record<string, any>>;
  language: Record<string, any> | null;
  frameworks: Set<Record<string, any>>;
  framework: Record<string, any> | null;
  technologies: Set<Record<string, any>>;
  technology: Record<string, any> | null;
}

const initialState: TaxonomiesState = {
  taxonomiesLoading: false,
  taxonomiesError: null,
  taxonomiesErrorMessage: '',
  taxonomiesStatusCode: '',
  projectTypes: new Set(),
  projectType: null,
  languages: new Set(),
  language: null,
  frameworks: new Set(),
  framework: null,
  technologies: new Set(),
  technology: null,
};

const getTaxonomy = (type: string, doc: DocumentData) => {
  let data = doc.data();
  let taxonomy = new Taxonomy({
    id: doc.id,
    type: type,
    title: data.title,
    iconURL: data.icon_url,
    className: data.class_name,
  });

  return taxonomy.toObject();
};

export const getProjectTypes = createAsyncThunk(
  'taxonomies/getProjectTypes',
  async () => {
    try {
      const type = 'project_types';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let projectTypes: Set<Record<string, any>> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        projectTypes.add(taxonomy);
      });

      return projectTypes;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getLanguages = createAsyncThunk(
  'taxonomies/getLanguages',
  async () => {
    try {
      const type = 'languages';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let languages: Set<Record<string, any>> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        languages.add(taxonomy);
      });

      return languages;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getFrameworks = createAsyncThunk(
  'taxonomies/getFrameworks',
  async () => {
    try {
      const type = 'frameworks';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let frameworks: Set<Record<string, any>> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        frameworks.add(taxonomy);
      });

      return frameworks;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTechnologies = createAsyncThunk(
  'taxonomies/getTechnologies',
  async () => {
    try {
      const type = 'technologies';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let technologies: Set<Record<string, any>> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        technologies.add(taxonomy);
      });

      return technologies;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getProjectType = createAsyncThunk(
  'taxonomies/getProjectType',
  async (projectType: string) => {
    try {
      const type = 'project_types';
      const projectTypeCollection = collection(db, type);
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        projectTypeCollection,
        projectType
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getLanguage = createAsyncThunk(
  'taxonomies/getLanguage',
  async (language: string) => {
    try {
      const type = 'languages';
      const languageCollection = collection(db, type);
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        languageCollection,
        language
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getFramework = createAsyncThunk(
  'taxonomies/getFramework',
  async (framework: string) => {
    try {
      const type = 'project_types';
      const frameworkCollection = collection(db, 'frameworks');
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        frameworkCollection,
        framework
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTechnology = createAsyncThunk(
  'taxonomies/getTechnology',
  async (technology: string) => {
    try {
      const type = 'project_types';
      const technologyCollection = collection(db, 'technologies');
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        technologyCollection,
        technology
      );
      const docSnap = await getDoc(docRef);

      let taxonomy: Record<string, any> = {};

      if (docSnap.exists()) {
        taxonomy = getTaxonomy(type, docSnap);
      }

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const taxonomiesSliceOptions: CreateSliceOptions<TaxonomiesState> = {
  name: 'taxonomies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectTypes.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.projectTypes = action.payload;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.languages = action.payload;
      })
      .addCase(getFrameworks.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.frameworks = action.payload;
      })
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.technologies = action.payload;
      })
      .addCase(getProjectType.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.projectType = action.payload;
      })
      .addCase(getLanguage.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.language = action.payload;
      })
      .addCase(getFramework.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.framework = action.payload;
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.technology = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getProjectTypes.pending,
          getFrameworks.pending,
          getTechnologies.pending,
          getProjectType.pending,
          getLanguage.pending,
          getFramework.pending,
          getTechnology.pending
        ),
        (state) => {
          state.taxonomiesLoading = true;
          state.taxonomiesError = null;
          state.taxonomiesErrorMessage = '';
          state.taxonomiesStatusCode = '';
        }
      )
      .addMatcher(
        isAnyOf(
          getProjectTypes.rejected,
          getFrameworks.rejected,
          getTechnologies.rejected,
          getProjectType.rejected,
          getLanguage.rejected,
          getFramework.rejected,
          getTechnology.rejected
        ),
        (state, action) => {
          state.taxonomiesLoading = false;
          state.taxonomiesError = action.error as Error;
          state.taxonomiesErrorMessage = action.error.message || '';
          state.taxonomiesStatusCode = action.error.code || '';
        }
      );
  },
};

export const taxonomiesSlice = createSlice(taxonomiesSliceOptions);

export default taxonomiesSlice;
