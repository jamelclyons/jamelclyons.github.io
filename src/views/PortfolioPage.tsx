import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../model/store';

import LoadingComponent from './components/LoadingComponent';
import PortfolioComponent from './components/portfolio/PortfolioComponent';
import StatusBarComponent from './components/StatusBarComponent';

import User from '../model/User';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';

interface PortfolioProps {
  user: User;
  portfolio: Portfolio;
  skills: Skills;
}

const PortfolioPage: React.FC<PortfolioProps> = ({ user, portfolio, skills }) => {

  const { portfolioLoading } = useSelector(
    (state: RootState) => state.portfolio
  );

  useEffect(() => {
    document.title = `Portfolio - ${user.name}`;
  }, []);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }
console.log(skills)
  return (
    <section className="portfolio">
      <>
        {portfolio || skills ? (
          <PortfolioComponent portfolio={portfolio} skills={skills} />
        ) : (
          <StatusBarComponent />
        )}
      </>
    </section>
  );
}

export default PortfolioPage;
