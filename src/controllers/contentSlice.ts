import {
  createSlice,
  createAsyncThunk,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

import { db } from '../services/firebase/config';

interface ContentState {
  contentLoading: boolean;
  contentStatusCode: string;
  contentError: Error | null;
  contentErrorMessage: string;
  content: Array<string>;
  title: string;
}

const initialState: ContentState = {
  contentLoading: false,
  contentStatusCode: '',
  contentError: null,
  contentErrorMessage: '',
  content: [],
  title: '',
};

export const getContent = createAsyncThunk(
  'content/getContent',
  async (pageSlug: string) => {
    try {
      const contentCollection = collection(db, 'content');
      const docRef = doc(contentCollection, pageSlug);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Could not be found.');
      }

      let content: Array<string> = [];

      if (Array.isArray(docSnap.data())) {
        docSnap.data().forEach((document: string) => {
          content.push(document);
        });
      }

      return content;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const contentSliceOptions: CreateSliceOptions<ContentState> = {
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContent.pending, (state) => {
        state.contentLoading = true;
      })
      .addCase(getContent.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.content = action.payload;
      })
      .addCase(getContent.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = (action.error as Error) || null;
        state.contentErrorMessage = action.error.message || '';
      });
  },
};

export const contentSlice = createSlice(contentSliceOptions);

export default contentSlice;
