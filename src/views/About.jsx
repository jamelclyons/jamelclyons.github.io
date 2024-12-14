import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMissionStatement } from '../controllers/aboutSlice';
import { getContent } from '../controllers/contentSlice';
import { getFounders } from '../controllers/founderSlice';

import ContentComponent from './components/ContentComponent';
import LoadingComponent from './components/LoadingComponent';
import FoundersComponent from './components/FoundersComponent';

import '../../dist/css/About.css';

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
  const { founders } = useSelector((state) => state.founder);

  useEffect(() => {
    if (contentStatusCode && contentErrorMessage) {
      setMessageType('error');
      setMessage(contentErrorMessage);
    }
  }, [contentStatusCode, contentErrorMessage]);

  useEffect(() => {
    dispatch(getMissionStatement());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContent('/about'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFounders());
  }, [dispatch]);

  return (
    <>
      <main className='about'>
        <h1 className="title">{title}</h1>

        <div className="mission-statement-card card">
          <h3 className="mission-statement">
            <q>{missionStatement}</q>
          </h3>
        </div>

        <ContentComponent content={content} />

        <FoundersComponent founders={founders} />
      </main>
    </>
  );
}

export default About;
