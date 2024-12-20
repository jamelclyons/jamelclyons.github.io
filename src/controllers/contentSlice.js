import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
    collection,
    getDocs,
    doc,
    getDoc,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

import { db } from '../services/firebase/config';

const initialState = {
    contentLoading: false,
    contentStatusCode: '',
    contentError: '',
    contentErrorMessage: '',
    content: '',
    title: ''
};

export const getContent = createAsyncThunk('content/getContent', async (pageSlug) => {

    try {
        const contentCollection = collection(db, 'content');
        const docRef = doc(contentCollection, pageSlug);
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

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getContent.pending, (state) => {
                state.contentLoading = true
            })
            .addCase(getContent.fulfilled, (state, action) => {
                state.contentLoading = false;
                state.content = action.payload;
            })
            .addCase(getContent.rejected, (state, action) => {
                state.contentLoading = false
                state.contentError = action.error;
                state.contentErrorMessage = action.error.message;
            })
    }
})

export default contentSlice;