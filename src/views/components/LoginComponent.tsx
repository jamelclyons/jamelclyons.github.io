import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';

import {
  signInWithGitHubPopup
} from '../../controllers/authSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../controllers/messageSlice';

import StatusBarComponent from './StatusBarComponent';
import ImageComponent from './ImageComponent';

import Image from '@/model/Image';

function LoginComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    authLoading,
    authSuccessMessage,
    authErrorMessage,
    isAuthenticated
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setMessage('Click Log in with GitHub to gain access to the code and/or obtain administrator privileges.'));
    dispatch(setMessageType('info'));
    dispatch(setShowStatusBar(Date.now()));
  }, []);

  useEffect(() => {
    if (authLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [authLoading]);

  useEffect(() => {
    if (authSuccessMessage) {
      dispatch(setMessage(authSuccessMessage));
      dispatch(setMessageType('success'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [authSuccessMessage]);

  useEffect(() => {
    if (authErrorMessage) {
      dispatch(setMessage(authErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [authErrorMessage]);

  const handleGitHubSignIn = async () => {
    dispatch(signInWithGitHubPopup());

    if (isAuthenticated) {
      window.location.href = '/#/admin/dashboard';
    }
  };

  return (
    <>
      <div className="login-options">

        <div className="providers">
          <button className="login-button google" onClick={handleGitHubSignIn}>
            <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />

            <h3>Login with GitHub</h3>
          </button>
        </div>
      </div>

      <StatusBarComponent />
    </>
  );
}

export default LoginComponent;
