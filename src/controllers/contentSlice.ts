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
  content: string;
  title: string;
}

const initialState: ContentState = {
  contentLoading: false,
  contentStatusCode: '',
  contentError: null,
  contentErrorMessage: '',
  content: '',
  title: '',
};

export const getContent = createAsyncThunk(
  'content/getContent',
  async (url: string) => {
    try {
      const content = await fetch(url, {
        headers: {
          auth: `Bearer ${import.meta.env.VITE_OCTOKIT_AUTH}`,
        },
      });

      return content.text();
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
