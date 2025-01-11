import { configureStore } from '@reduxjs/toolkit';
import { aboutSlice } from '../controllers/aboutSlice.js';
import { contactSlice } from '../controllers/contactSlice.js';
import { contentSlice } from '../controllers/contentSlice.js';
import { portfolioSlice } from '../controllers/portfolioSlice.js';
import { projectSlice } from '../controllers/projectSlice.js';
import { githubSlice } from '../controllers/githubSlice.js';
import { taxonomiesSlice } from '../controllers/taxonomiesSlice.js';
import { userSlice } from '../controllers/userSlice.js';
import { addSlice } from '../controllers/addSlice.js';
import { messageSlice } from '../controllers/messageSlice.js';
import { updateSlice } from '../controllers/updateSlice.js';
var store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        add: addSlice.reducer,
        contact: contactSlice.reducer,
        content: contentSlice.reducer,
        message: messageSlice.reducer,
        portfolio: portfolioSlice.reducer,
        project: projectSlice.reducer,
        github: githubSlice.reducer,
        taxonomies: taxonomiesSlice.reducer,
        update: updateSlice.reducer,
        user: userSlice.reducer,
    },
});
export default store;