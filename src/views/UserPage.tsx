import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import LoadingComponent from './components/LoadingComponent';
import UserComponent from './components/user/UserComponent';

import type { AppDispatch, RootState } from '@/model/store';
import User from '@/model/User';

import {
  getUser,
} from '@/controllers/userSlice';

const UserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { login } = useParams<string>();

  const { userLoading, userObject } = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState<User>(new User());

  useEffect(() => {
    if (login) {
      dispatch(getUser(login));
    }
  }, [dispatch, login]);

  useEffect(() => {
    if (userObject) {
      setUser(new User(userObject));
    }
  }, [userObject]);

  if (userLoading) {
    return (
      <section className='user'>
        <>
          <LoadingComponent />
        </>
      </section>);
  }

  return (
    <section className='user' id='top'>
      <>
        {user ? <UserComponent user={user} /> : <LoadingComponent />}
      </>
    </section>
  );
};

export default UserPage;
