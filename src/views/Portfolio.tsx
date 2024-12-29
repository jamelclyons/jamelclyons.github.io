import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import type { AppDispatch, RootState } from '../model/store';

import { getPortfolio } from '../controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from '../controllers/taxonomiesSlice';

import LoadingComponent from './components/LoadingComponent';
import PortfolioComponent from './components/portfolio/PortfolioComponent';
import StatusBarComponent from './components/StatusBarComponent';

import User from '../model/User';
import Project from '../model/Project';

interface PortfolioProps {
  user: User;
  portfolio: Array<Project>;
}

const Portfolio: React.FC<PortfolioProps> = ({ user, portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { portfolioLoading } = useSelector(
    (state: RootState) => state.portfolio
  );
  const { projectTypes, languages, frameworks, technologies } = useSelector(
    (state: RootState) => state.taxonomies
  );

  useEffect(() => {
    document.title = `Portfolio - ${user?.name}`;
  }, []);

  useEffect(() => {
    dispatch(getProjectTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFrameworks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTechnologies());
  }, [dispatch]);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className="portfolio">
      <>
        {portfolio ? (
          <PortfolioComponent
            portfolio={portfolio}
            projectTypes={projectTypes}
            languages={languages}
            frameworks={frameworks}
            technologies={technologies}
          />
        ) : (
          <StatusBarComponent />
        )}
      </>
    </section>
  );
}

export default Portfolio;
