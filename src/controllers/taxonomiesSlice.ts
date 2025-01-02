import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions
} from '@reduxjs/toolkit';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  QuerySnapshot,
  DocumentData,
  DocumentReference,
  DocumentSnapshot
} from 'firebase/firestore';

import db from '../services/firebase/config';

import Taxonomy from '../model/Taxonomy';
import Project from '../model/Project';

interface TaxonomiesState {
  taxonomiesLoading: boolean;
  taxonomiesError: Error | null;
  taxonomiesErrorMessage: string;
  taxonomiesStatusCode: string;
  projects: Array<Project>;
  projectTypes: Set<Taxonomy>;
  projectType: Taxonomy | null;
  languages: Set<Taxonomy>;
  language: Taxonomy | null;
  frameworks: Set<Taxonomy>;
  framework: Taxonomy | null;
  technologies: Set<Taxonomy>;
  technology: Taxonomy | null;
}

const initialState: TaxonomiesState = {
  taxonomiesLoading: false,
  taxonomiesError: null,
  taxonomiesErrorMessage: '',
  taxonomiesStatusCode: '',
  projects: [],
  projectTypes: new Set,
  projectType: null,
  languages: new Set,
  language: null,
  frameworks: new Set,
  framework: null,
  technologies: new Set,
  technology: null,
};

export const getProjectTypes = createAsyncThunk(
  'taxonomies/getProjectTypes',
  async () => {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, 'project_types')
      );

      let projectTypes: Set<Taxonomy> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let data = doc.data();
        let taxonomy = new Taxonomy(
          doc.id,
          'project_types',
          data.title,
          data.icon_url,
          data.class_name
        );
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
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, 'languages')
      );

      let languages: Set<Taxonomy> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let data = doc.data();
        let taxonomy = new Taxonomy(
          doc.id,
          'languages',
          data.title,
          data.icon_url,
          data.class_name
        );
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
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, 'frameworks')
      );

      let frameworks: Set<Taxonomy> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let data = doc.data();
        let taxonomy = new Taxonomy(
          doc.id,
          'frameworks',
          data.title,
          data.icon_url,
          data.class_name
        );
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
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, 'technologies')
      );

      let technologies: Set<Taxonomy> = new Set();

      querySnapshot.forEach((doc: DocumentData) => {
        let data = doc.data();
        let taxonomy = new Taxonomy(
          doc.id,
          'technologies',
          data.title,
          data.icon_url,
          data.class_name
        );
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

export const getProjectType = createAsyncThunk<Taxonomy, string>(
  'taxonomies/getProjectType',
  async (projectType: string) => {
    try {
      const type = 'project_types';             
      const projectTypeCollection = collection(db, type);
      const docRef: DocumentReference<unknown, DocumentData> = doc(projectTypeCollection, projectType);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Could not be found.');
      }

      const data = docSnap.data() as { title: string; icon_url: string; class_name: string };

      const taxonomy = new Taxonomy(
        docSnap.id,
        type,
        data?.title,
        data?.icon_url,
        data?.class_name
      );

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getLanguage = createAsyncThunk<Taxonomy, string>(
  'taxonomies/getLanguage',
  async (language: string) => {
    try {
      const languageCollection = collection(db, 'languages');
      const docRef: DocumentReference<unknown, DocumentData> = doc(languageCollection, language);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Could not be found.');
      }

      const data = docSnap.data() as { title: string; icon_url: string; class_name: string };
      const taxonomy = new Taxonomy(
        docSnap.id,
        'languages',
        data.title,
        data.icon_url,
        data.class_name
      );

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getFramework = createAsyncThunk<Taxonomy, string>(
  'taxonomies/getFramework',
  async (framework: string) => {
    try {
      const frameworkCollection = collection(db, 'frameworks');
      const docRef: DocumentReference<unknown, DocumentData> = doc(frameworkCollection, framework);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Could not be found.');
      }

      const data = docSnap.data() as { title: string; icon_url: string; class_name: string };
      const taxonomy = new Taxonomy(
        docSnap.id,
        'frameworks',
        data.title,
        data.icon_url,
        data.class_name
      );

      return taxonomy;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTechnology = createAsyncThunk<Taxonomy, string>(
  'taxonomies/getTechnology',
  async (technology: string) => {
    try {
      const technologyCollection = collection(db, 'technologies');
      const docRef: DocumentReference<unknown, DocumentData> = doc(technologyCollection, technology);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Could not be found.');
      }

      const data = docSnap.data() as { title: string; icon_url: string; class_name: string };
      const taxonomy = new Taxonomy(
        docSnap.id,
        'technologies',
        data.title,
        data.icon_url,
        data.class_name
      );

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
