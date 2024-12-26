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
  DocumentReference
} from 'firebase/firestore';

import db from '../services/firebase/config';

import User from '../model/User';
import Image from '../model/Image';

interface UserState {
  userLoading: boolean;
  userStatusCode: string;
  userError: Error | null;
  userErrorMessage: string;
  title: string;
  avatarURL: string;
  authorURL: string;
  fullName: string;
  bio: string;
  resume: string;
  content: Array<string> | null;
  user: User | null;
  organizations: [];
  repos: [];
  socialAccounts: [];
}

const initialState: UserState = {
  userLoading: false,
  userStatusCode: '',
  userError: null,
  userErrorMessage: '',
  title: '',
  avatarURL: '',
  authorURL: '',
  fullName: '',
  bio: '',
  resume: '',
  content: null,
  user: null,
  organizations: [],
  repos: [],
  socialAccounts: [],
};

export const getUser = createAsyncThunk<User, string>(
  'user/getUser',
  async (username) => {
    try {
      const userCollection = collection(db, 'user');
      const docRef: DocumentReference<unknown, DocumentData> = doc(userCollection, username);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Could not be found.');
      }

      let data = docSnap.data() as User;
      let user = new User(data);

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
);

const userSliceOptions: CreateSliceOptions<UserState> = {
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = '';
        state.userError = null;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(getUser.pending), (state) => {
        state.userLoading = true;
        state.userErrorMessage = '';
        state.userError = null;
      })
      .addMatcher(isAnyOf(getUser.rejected), (state, action) => {
        state.userLoading = false;
        state.userErrorMessage = action.error.message || '';
        state.userError = action.error as Error;
      });
  },
};

export const userSlice = createSlice(userSliceOptions);

export default userSlice;
