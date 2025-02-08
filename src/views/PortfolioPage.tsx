import React, { useEffect } from 'react';

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
