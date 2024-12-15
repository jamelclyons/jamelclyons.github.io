import { configureStore } from '@reduxjs/toolkit';

import { aboutSlice } from '../controllers/aboutSlice.js';
import { contactSlice } from '../controllers/contactSlice.js';
import { contentSlice } from '../controllers/contentSlice.js';
import { githubSlice } from '../controllers/githubSlice.js';
import { taxonomiesSlice } from '../controllers/taxonomiesSlice';

const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        contact: contactSlice.reducer,
        content: contentSlice.reducer,
        github: githubSlice.reducer,
        taxonomies: taxonomiesSlice.reducer
    }
});

export default store;