import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import {
  doc,
  getDoc,
  Timestamp,
  collection,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import { db } from '../services/firebase/config';

interface DatabaseState {
  databaseLoading: boolean;
  databaseStatusCode: string;
  databaseError: Error | null;
  databaseErrorMessage: string;
  title: string;
  avatarURL: string;
  authorURL: string;
  fullName: string;
  bio: string;
  resume: string;
  content: Array<string> | null;
  userObject: Record<string, any> | null;
  organizations: [];
  repos: [];
  socialAccounts: [];
  userDataObject: Record<string, any> | null;
  organizationDataObject: Record<string, any> | null;
}

const initialState: DatabaseState = {
  databaseLoading: false,
  databaseStatusCode: '',
  databaseError: null,
  databaseErrorMessage: '',
  title: '',
  avatarURL: '',
  authorURL: '',
  fullName: '',
  bio: '',
  resume: '',
  content: null,
  userObject: {},
  organizations: [],
  repos: [],
  socialAccounts: [],
  userDataObject: null,
  organizationDataObject: null,
};

const portfolioCollection: CollectionReference<DocumentData, DocumentData> =
  collection(db, 'portfolio');

export const getUserData = createAsyncThunk(
  'database/getUserData',
  async (username: string) => {
    try {
      const docRef = doc(db, `user/${username}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data() as Record<string, any>;

        Object.keys(data).forEach((key) => {
          if (data[key] instanceof Timestamp) {
            data[key] = data[key].toDate().toISOString();
          }
        });

        return data;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationData = createAsyncThunk(
  'database/getOrganizationData',
  async (organization: string) => {
    try {
      const docRef = doc(db, `organization/${organization}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data() as Record<string, any>;

        Object.keys(data).forEach((key) => {
          if (data[key] instanceof Timestamp) {
            data[key] = data[key].toDate().toISOString();
          }
        });

        return data;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getTaxonomyData = createAsyncThunk(
  'database/getTaxonomyData',
  async (organization: string) => {
    try {
      const docRef = doc(db, `organization/${organization}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data() as Record<string, any>;

        Object.keys(data).forEach((key) => {
          if (data[key] instanceof Timestamp) {
            data[key] = data[key].toDate().toISOString();
          }
        });

        return data;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getProjectData = createAsyncThunk(
  'database/getProjectData',
  async (projectID: string) => {
    try {
      const docRef: DocumentReference = doc(portfolioCollection, projectID);
      const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
        await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap as Record<string, any>;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const databaseSliceOptions: CreateSliceOptions<DatabaseState> = {
  name: 'database',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.databaseLoading = false;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.userDataObject = action.payload;
      })
      .addCase(getOrganizationData.fulfilled, (state, action) => {
        state.databaseLoading = false;
        state.databaseErrorMessage = '';
        state.databaseError = null;
        state.organizationDataObject = action.payload;
      })
      .addMatcher(
        isAnyOf(getUserData.pending, getOrganizationData.pending),
        (state) => {
          state.databaseLoading = true;
          state.databaseErrorMessage = '';
          state.databaseError = null;
        }
      )
      .addMatcher(
        isAnyOf(getUserData.rejected, getOrganizationData.rejected),
        (state, action) => {
          state.databaseLoading = false;
          state.databaseErrorMessage = action.error.message || '';
          state.databaseError = action.error as Error;
        }
      );
  },
};

export const databaseSlice = createSlice(databaseSliceOptions);

export default databaseSlice;
