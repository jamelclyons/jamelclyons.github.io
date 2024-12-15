import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMissionStatement } from '../controllers/aboutSlice';
import { getContent } from '../controllers/contentSlice';
import {
  getUser,
  getOrganizations,
  getRepos,
  getSocialAccounts,
} from '../controllers/githubSlice';

import ContentComponent from './components/ContentComponent';
import LoadingComponent from './components/LoadingComponent';
import FoundersComponent from './components/FoundersComponent';
import Member from './components/Member';
import SocialBar from './components/SocialBar';

function About() {
  const dispatch = useDispatch();

  const { missionStatement } = useSelector((state) => state.about);
  const {
    contentLoading,
    contentStatusCode,
    contentErrorMessage,
    title,
    content,
  } = useSelector((state) => state.content);
  const { user, socialAccounts } = useSelector((state) => state.github);

  useEffect(() => {
    if (contentStatusCode && contentErrorMessage) {
      setMessageType('error');
      setMessage(contentErrorMessage);
    }
  }, [contentStatusCode, contentErrorMessage]);

  useEffect(() => {
    dispatch(getUser('jamelclyons'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrganizations('jamelclyons'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRepos('jamelclyons'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSocialAccounts('jamelclyons'));
  }, [dispatch]);
console.log(user);
  return (
    <>
      <main className="about">
        <h1 className="title">{user.name}</h1>

        <div className="mission-statement-card card">
          <h3 className="mission-statement">
            <q>{user.bio}</q>
          </h3>
        </div>

        <Member url={user.avatar_url} email={user.email} />

        <SocialBar socialAccounts={socialAccounts} email={user.email} />
      </main>
    </>
  );
}

export default About;
