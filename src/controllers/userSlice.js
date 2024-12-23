import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import {
    collection,
    getDocs,
    doc,
    getDoc,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

import { db } from '../services/firebase/config';

import User from '../model/User';
import SocialAccount from '../model/SocialAccount';

const initialState = {
    userLoading: false,
    userStatusCode: '',
    userError: '',
    userErrorMessage: '',
    title: '',
    avatarURL: '',
    authorURL: '',
    fullName: '',
    bio: '',
    frameworks: '',
    skills: '',
    technologies: '',
    socialNetworks: '',
    resume: '',
    content: '',
    user: '',
    organizations: [],
    repos: [],
    socialAccounts: []
};

export const getUser = createAsyncThunk('user/getUser', async () => {

    try {
        const userCollection = collection(db, 'user');
        const querySnapshot = await getDocs(userCollection);

        let users = [];

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let user = new User(data);
            user.id = doc.id;

            let socialAccounts = [];

            if (Array.isArray(data.social_accounts) && data.social_accounts.length > 0) {
                data.social_accounts.forEach((account) => {
                    socialAccounts.push(new SocialAccount(account));
                });
            }

            user.socialAccounts = socialAccounts;

            users.push(user);
        });

        return users[0];
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userStatusCode = action.payload.statusCode
                state.userErrorMessage = action.payload.errorMessage
                state.user = action.payload
            })
            .addMatcher(isAnyOf(
                getUser.pending,
            ), (state) => {
                state.userLoading = true
                state.userStatusCode = ''
                state.userErrorMessage = ''
                state.userError = ''
            })
            .addMatcher(isAnyOf(
                getUser.rejected,
            ), (state, action) => {
                state.userLoading = false
                state.userStatusCode = action.error.code
                state.userErrorMessage = action.error.message
                state.userError = action.error
            })
    }
})

export default userSlice;