import { configureStore } from '@reduxjs/toolkit';

import { contentSlice } from '@the7ofdiamonds/ui-ux';

import { aboutSlice, contactSlice } from '@the7ofdiamonds/communications';

import {
  addSlice,
  portfolioSlice,
  projectSlice,
  githubSlice,
  userSlice,
  accountSlice,
  updateSlice,
  organizationSlice,
  databaseSlice,
  skillsSlice,
} from '@the7ofdiamonds/github-portfolio';

import { authSlice } from '@the7ofdiamonds/gateway';

export const store = configureStore({
  reducer: {
    about: aboutSlice.reducer,
    add: addSlice.reducer,
    contact: contactSlice.reducer,
    content: contentSlice.reducer,
    portfolio: portfolioSlice.reducer,
    project: projectSlice.reducer,
    github: githubSlice.reducer,
    update: updateSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
    database: databaseSlice.reducer,
    organization: organizationSlice.reducer,
    account: accountSlice.reducer,
    skill: skillsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
