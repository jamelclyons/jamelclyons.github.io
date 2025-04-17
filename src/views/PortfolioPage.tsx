import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PortfolioComponent from './components/portfolio/PortfolioComponent';

import type { AppDispatch, RootState } from '@/model/store';
import User from '../model/User';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

interface PortfolioProps {
  user: User;
}

const PortfolioPage: React.FC<PortfolioProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { portfolioLoading, portfolioObject, portfolioErrorMessage } = useSelector((state: RootState) => state.portfolio);

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessage('Now Loading Portfolio'));
      dispatch(setShowStatusBar('show'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (user.repoQueries && portfolioObject === null) {
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
    if (portfolioErrorMessage) {
      dispatch(setMessage(portfolioErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [portfolioErrorMessage]);

  useEffect(() => {
    document.title = `Portfolio - ${user.name}`;
  }, []);

  return (
    <section className="portfolio">
      <>
        <PortfolioComponent account={user} />
      </>
    </section>
  );
}

export default PortfolioPage;
