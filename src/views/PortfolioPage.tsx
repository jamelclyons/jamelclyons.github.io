import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import StatusBarComponent from './components/StatusBarComponent';

import type { AppDispatch, RootState } from '@/model/store';
import User from '../model/User';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';
import { getAuthenticatedUserAccount } from '@/controllers/userSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

interface PortfolioProps {
  user: User;
  portfolio: Portfolio;
  skills: Skills;
}

const PortfolioPage: React.FC<PortfolioProps> = ({ user, portfolio, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { authenticatedUserObject } = useSelector((state: RootState) => state.user);
  const { portfolioLoading, portfolioErrorMessage, portfolioObject } = useSelector((state: RootState) => state.portfolio);

  useEffect(() => {
    if (authenticatedUserObject === null) {
      dispatch(getAuthenticatedUserAccount());
    }
  }, [authenticatedUserObject, dispatch]);

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
  }, [portfolioLoading, dispatch]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      dispatch(setMessage(portfolioErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [portfolioErrorMessage]);

  useEffect(() => {
    if (authenticatedUserObject === null) {
      dispatch(getAuthenticatedUserAccount());
    }
  }, [authenticatedUserObject, dispatch]);

  useEffect(() => {
    document.title = `Portfolio - ${user.name}`;
  }, []);

  return (
    <section className="portfolio">
      <>
        {portfolio || skills ? (
          <PortfolioComponent portfolio={portfolio} />
        ) : (
          <StatusBarComponent />
        )}
      </>
    </section>
  );
}

export default PortfolioPage;
