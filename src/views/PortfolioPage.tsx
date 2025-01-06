import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../model/store';

import LoadingComponent from './components/LoadingComponent';
import PortfolioComponent from './components/portfolio/PortfolioComponent';
import StatusBarComponent from './components/StatusBarComponent';

import User from '../model/User';
import Portfolio from '../model/Portfolio';

interface PortfolioProps {
  user: User;
  portfolio: Portfolio;
}

const PortfolioPage: React.FC<PortfolioProps> = ({ user, portfolio }) => {

  const { portfolioLoading } = useSelector(
    (state: RootState) => state.portfolio
  );

  useEffect(() => {
    document.title = `Portfolio - ${user.name}`;
  }, []);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className="portfolio">
      <>
        {portfolio ? (
          <PortfolioComponent portfolio={portfolio} />
        ) : (
          <StatusBarComponent />
        )}
      </>
    </section>
  );
}

export default PortfolioPage;