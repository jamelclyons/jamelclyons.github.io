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
import Portfolio from '@/model/Portfolio';

import { setMessage, setMessageType } from '@/controllers/messageSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

interface HomeProps {
  user: User;
  skills: Skills;
}

const Home: React.FC<HomeProps> = ({ user, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { accountLoading } = useSelector((state: RootState) => state.account);
  const { userLoading } = useSelector((state: RootState) => state.user);
  const { portfolioLoading, portfolioObject } = useSelector((state: RootState) => state.portfolio);

  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio(portfolioObject ?? []));

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
  }, [accountLoading, dispatch]);

  useEffect(() => {
    if (userLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading User'));
    }
  }, [userLoading, dispatch]);

  useEffect(() => {
    if (portfolioObject === null) {
      dispatch(getPortfolio(user.repoQueries));
    }
  }, [portfolioObject, user, dispatch]);

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading Portfolio'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject));
    }
  }, [portfolioObject]);

  return (
    <>
      <section className="home">
        <MemberIntroductionComponent
          user={user}
        />

        <MemberKnowledgeComponent skills={skills} />

        {portfolio.size > 0 ? <PortfolioComponent account={user} /> : <LoadingComponent />}

        <ContactComponent user={user} />
      </section>
    </>
  );
}

export default Home;
