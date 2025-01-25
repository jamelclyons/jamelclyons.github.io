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

import { db } from '../services/firebase/config';

import Taxonomy from '../model/Taxonomy';

export type TaxImageQuery = {
  id: string;
  type: string;
};

interface TaxonomiesState {
  taxonomiesLoading: boolean;
  taxonomiesError: Error | null;
  taxonomiesErrorMessage: string;
  taxonomiesStatusCode: string;
  projectTypesObject: Array<Record<string, any>>;
  projectTypeObject: Record<string, any> | null;
  languagesObject: Array<Record<string, any>>;
  languageObject: Record<string, any> | null;
  frameworksObject: Array<Record<string, any>>;
  frameworkObject: Record<string, any> | null;
  technologiesObject: Array<Record<string, any>>;
  technologyObject: Record<string, any> | null;
}

const initialState: TaxonomiesState = {
  taxonomiesLoading: false,
  taxonomiesError: null,
  taxonomiesErrorMessage: '',
  taxonomiesStatusCode: '',
  projectTypesObject: [],
  projectTypeObject: null,
  languagesObject: [],
  languageObject: null,
  frameworksObject: [],
  frameworkObject: null,
  technologiesObject: [],
  technologyObject: null,
};

const getTaxonomy = (type: string, doc: DocumentData) => {
  let data = doc.data();
  let taxonomy = new Taxonomy({
    id: doc.id,
    type: type,
    title: data?.title,
    icon_url: data?.icon_url,
    class_name: data?.class_name,
  });

  return taxonomy.toObject();
};

export const getTaxImage = createAsyncThunk(
  'taxonomies/getTaxImage',
  async (query: TaxImageQuery) => {
    try {
      const docRef: DocumentReference<unknown, DocumentData> = doc(
        collection(db, query.type),
        query.id
      );
      const images = await getDoc(docRef);

      return images;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTaxImages = createAsyncThunk<
  Array<Record<string, any>>,
  { type: string; taxonomies: Array<Record<string, any>> }
>('taxonomies/getTaxImages', async ({ type, taxonomies }) => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, type)
    );

    let updatedTaxonomies: Array<Record<string, any>> = [];

    querySnapshot.forEach((doc: DocumentData) => {
      let data = doc.data();

      taxonomies.forEach((taxonomy) => {
        if (taxonomy.id === doc.id) {
          let tax = new Taxonomy(taxonomy);
          tax.setClassName(data?.class_name);
          tax.setIconURL(data?.icon_url);
          updatedTaxonomies.push(tax.toObject());
        }
      });
    });

    return updatedTaxonomies;
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

export const getProjectTypes = createAsyncThunk(
  'taxonomies/getProjectTypes',
  async () => {
    try {
      const type = 'project_types';
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, type)
      );

      let projectTypes: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        projectTypes.push(taxonomy);
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

      let languages: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        languages.push(taxonomy);
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

      let frameworks: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        frameworks.push(taxonomy);
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

      let technologies: Array<Record<string, any>> = [];

      querySnapshot.forEach((doc: DocumentData) => {
        let taxonomy = getTaxonomy(type, doc);

        technologies.push(taxonomy);
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
        state.projectTypesObject = action.payload;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.languagesObject = action.payload;
      })
      .addCase(getFrameworks.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.frameworksObject = action.payload;
      })
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.technologiesObject = action.payload;
      })
      .addCase(getProjectType.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.projectTypeObject = action.payload;
      })
      .addCase(getLanguage.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.languageObject = action.payload;
      })
      .addCase(getFramework.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.frameworkObject = action.payload;
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.taxonomiesLoading = false;
        state.taxonomiesError = null;
        state.taxonomiesErrorMessage = '';
        state.technologyObject = action.payload;
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
