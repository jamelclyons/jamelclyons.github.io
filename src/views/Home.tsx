import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';
import MemberKnowledgeComponent from './components/member/MemberKnowledgeComponent';
import LoadingComponent from './components/LoadingComponent';

import type { AppDispatch, RootState } from '@/model/store';
import User from '@/model/User';
import Skills from '@/model/Skills';

import userJson from '../../user.json';

import { setMessage, setMessageType } from '@/controllers/messageSlice';

interface HomeProps {
  user: User;
  skills: Skills;
}

const Home: React.FC<HomeProps> = ({ user, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { githubLoading } = useSelector((state: RootState) => state.github);

  useEffect(() => { 
    if(!user.title){
      user.setTitle(userJson.title)
    }
  }, [user]);

  useEffect(() => {
    if (user.name) {
      document.title = user.name;
    }
  }, [user]);

  useEffect(() => {
    if (githubLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading Portfolio'));
    }
  }, [githubLoading]);

  return (
    <>
      <section className="home">
        <MemberIntroductionComponent
          user={user}
        />

        <MemberKnowledgeComponent skills={skills} />

        {user ? <PortfolioComponent account={user} /> : <LoadingComponent />}

        <ContactComponent user={user} />
      </section>
    </>
  );
}

export default Home;
