import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';
import MemberKnowledgeComponent from './components/member/MemberKnowledgeComponent';
import LoadingComponent from './components/LoadingComponent';

import type { AppDispatch, RootState } from '@/model/store';
import User from '@/model/User';
import Skills from '@/model/Skills';
import Portfolio from '@/model/Portfolio';

import { setMessage, setMessageType } from '@/controllers/messageSlice';
import { getAuthenticatedUserAccount } from '@/controllers/userSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

interface HomeProps {
  user: User;
  skills: Skills;
  portfolio: Portfolio;
}

const Home: React.FC<HomeProps> = ({ user, skills, portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { accountLoading } = useSelector((state: RootState) => state.account);
  const { userLoading, authenticatedUserObject } = useSelector((state: RootState) => state.user);
  const { portfolioLoading } = useSelector((state: RootState) => state.portfolio);

  useEffect(() => {
    if (user) {
      document.title = user.name;
    }
  }, []);

  useEffect(() => {
    if (accountLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading Home Page'));
    }
  }, [accountLoading]);

  useEffect(() => {
    if (authenticatedUserObject === null) {
      dispatch(getAuthenticatedUserAccount());
    }
  }, [authenticatedUserObject, dispatch]);

  useEffect(() => {
    if (userLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading User'));
    }
  }, [userLoading]);

  useEffect(() => {
    dispatch(getPortfolio(user.repoQueries));
  }, [user]);

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading Portfolio'));
    }
  }, [portfolioLoading]);

  return (
    <>
      <section className="home">
        <MemberIntroductionComponent
          user={user}
        />

        <MemberKnowledgeComponent skills={skills} />

        {portfolio.size > 0 ? <PortfolioComponent portfolio={portfolio} /> : <LoadingComponent />}

        <ContactComponent user={user} />
      </section>
    </>
  );
}

export default Home;
