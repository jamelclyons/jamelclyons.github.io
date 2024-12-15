import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
const baseURL = 'https://api.github.com';
const getUserURL = `${baseURL}/users`;

const initialState = {
    founderLoading: false,
    founderStatusCode: '',
    founderError: '',
    founderErrorMessage: '',
    founders: '',
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

export const getUser = createAsyncThunk('github/getUser', async (username) => {

    try {
        const response = await fetch(`${getUserURL}/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const getOrganizations = createAsyncThunk('github/getFoundersWithTerm', async (username) => {

    try {
        const response = await fetch(`${getUserURL}/${username}/orgs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
console.log(responseData);
        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const getRepos = createAsyncThunk('github/getFounder', async (username) => {

    try {
        const response = await fetch(`${getUserURL}/${username}/repos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData = await response.json();
        console.log(responseData);

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const getCommits = createAsyncThunk('github/getFounder', async (username) => {

    try {
        const response = await fetch(`${getUserURL}/${username}/repos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData = await response.json();
        console.log(responseData);

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const getSocialAccounts = createAsyncThunk('github/getSocialAccounts', async (username) => {

    try {
        const response = await fetch(`${getUserURL}/${username}/social_accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData = await response.json();
        console.log(responseData);

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.githubLoading = false;
                state.githubStatusCode = action.payload.statusCode
                state.githubErrorMessage = action.payload.errorMessage
                state.user = action.payload
            })
            .addCase(getOrganizations.fulfilled, (state, action) => {
                state.founderLoading = false
                state.founderError = null
                state.organizations = action.payload;
            })
            .addCase(getRepos.fulfilled, (state, action) => {
                state.githubLoading = false;
                state.githubStatusCode = action.payload.statusCode
                state.githubErrorMessage = action.payload.errorMessage
                state.repos = action.payload
            })
            .addCase(getSocialAccounts.fulfilled, (state, action) => {
                state.githubLoading = false;
                state.githubStatusCode = action.payload.statusCode
                state.githubErrorMessage = action.payload.errorMessage
                state.socialAccounts = action.payload
            })
            .addMatcher(isAnyOf(
                getUser.pending,
            ), (state) => {
                state.founderLoading = true
                state.founderStatusCode = ''
                state.founderErrorMessage = ''
                state.founderError = ''
            })
            .addMatcher(isAnyOf(
                getUser.rejected,
            ), (state, action) => {
                state.founderLoading = false
                state.founderStatusCode = action.error.code
                state.founderErrorMessage = action.error.message
                state.founderError = action.error
            })
    }
})

export default githubSlice;