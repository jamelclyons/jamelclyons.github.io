import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMessage, setMessageType } from '@/controllers/messageSlice';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';
import MemberKnowledgeComponent from './components/member/MemberKnowledgeComponent';
import LoadingComponent from './components/LoadingComponent';

import type { AppDispatch, RootState } from '@/model/store';
import User from '@/model/User';
import Skills from '@/model/Skills';

import userJson from '../../user.json';

interface HomeProps {
  user: User;
  skills: Skills;
}

const Home: React.FC<HomeProps> = ({ user, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { githubLoading } = useSelector((state: RootState) => state.github);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!user.title) {
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
