import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

import { auth } from '@/services/firebase/config';

import type { RootState } from '@/model/store';

interface loginState {
  loginLoading: boolean;
  loginError: Error | null;
  loginSuccessMessage: string;
  loginErrorMessage: string;
  loginStatusCode: number | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: Record<string, any> | null;
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: loginState = {
  loginLoading: false,
  loginError: null,
  loginSuccessMessage: '',
  loginErrorMessage: '',
  loginStatusCode: null,
  isAuthenticated: Boolean(localStorage.getItem('is_authenticated')),
  isAdmin: Boolean(localStorage.getItem('is_admin')),
  user: null,
  id: '',
  username: '',
  email: '',
  phoneNumber: '',
  profileImage: '',
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
};

export const updateIsAuthenticated = (authenticated: boolean) => {
  return {
    type: 'login/updateIsAuthenticated',
    payload: authenticated,
  };
};

export const updateIsAdmin = (admin: boolean) => {
  return {
    type: 'login/updateIsAdmin',
    payload: admin,
  };
};

export const setIsAuthenticated = createAsyncThunk(
  'login/setIsAuthenticated',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { accessToken, refreshToken } = state.login;

    const authenticated = Boolean(accessToken && refreshToken);

    updateIsAuthenticated(authenticated);

    return authenticated;
  }
);

export const setIsAdmin = createAsyncThunk(
  'login/setIsAdmin',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { isAuthenticated } = state.login;

    let isAdmin = false;

    const user = auth.currentUser;

    if (isAuthenticated && user) {
      try {
        const token = await user.getIdTokenResult();
        isAdmin = Boolean(token.claims?.isAdmin);
      } catch (error) {
        console.error('Error retrieving token claims:', error);
      }
    }

    console.log('Admin status:', isAdmin);

    updateIsAdmin(isAdmin);

    return isAdmin;
  }
);

export const updateAccountID = (id: string) => {
  return {
    type: 'login/updateAccountID',
    payload: id,
  };
};

export const updateEmail = (email: string) => {
  return {
    type: 'login/updateEmail',
    payload: email,
  };
};

export const updateUsername = (username: string) => {
  return {
    type: 'login/updateUsername',
    payload: username,
  };
};

export const updateProfileImage = (profileImage: string) => {
  return {
    type: 'login/updateProfileImage',
    payload: profileImage,
  };
};

export const updateAccessToken = (access_token: string) => {
  return {
    type: 'login/updateAccessToken',
    payload: access_token,
  };
};

export const updateRefreshToken = (refresh_token: string) => {
  return {
    type: 'login/updateRefreshToken',
    payload: refresh_token,
  };
};

export const signInWithGitHubPopup = createAsyncThunk(
  'login/signInWithGitHubPopup',
  async () => {
    try {
      const github = new GithubAuthProvider();

      const response = await signInWithPopup(auth, github);

      const user = response.user;
      const accessToken = await user.getIdToken();
      const token = await user.getIdTokenResult();
      const refreshToken = user.refreshToken;
      const username = user.displayName ?? '';
      const email = user.email ?? '';
      const profileImage = user.photoURL ?? '';
      const phoneNumber = user.phoneNumber ?? '';
      const isAdmin = Boolean(token.claims?.isAdmin);
      
      updateIsAuthenticated(Boolean(accessToken && refreshToken));
      updateIsAdmin(isAdmin);
      updateAccessToken(accessToken);
      updateRefreshToken(user.refreshToken);
      updateAccountID(user.uid);
      updateEmail(email);
      updateUsername(username);
      updateProfileImage(profileImage);

      return {
        id: user.uid,
        access_token: accessToken,
        refresh_token: user.refreshToken,
        username: username,
        email: email,
        phone_number: phoneNumber,
        profile_image: profileImage,
        authenticated: true,
      };
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateIsAuthenticated: (state, action) => {
      localStorage.setItem('is_authenticated', action.payload);
    },
    updateIsAdmin: (state, action) => {
      localStorage.setItem('is_admin', action.payload);
    },
    updateAccountID: (state, action) => {
      state.id = action.payload;
      localStorage.setItem('id', action.payload);
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem('email', action.payload);
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
      localStorage.setItem('profile_image', action.payload);
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('access_token', action.payload);
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem('refresh_token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGitHubPopup.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginErrorMessage = '';
      state.loginError = null;
      state.user = action.payload;
      state.id = action.payload.id;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phone_number;
      state.username = action.payload.username;
      state.isAuthenticated = action.payload.authenticated;
    });
    builder.addCase(setIsAuthenticated.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginErrorMessage = '';
      state.loginError = null;
      state.isAuthenticated = action.payload;
    });
  },
});

export default loginSlice;
