import React, { useEffect, useState } from 'react';

import LoadingComponent from '../LoadingComponent';
import ProjectsComponent from './ProjectsComponent';
import SkillsComponent from '../SkillsComponent';

import Portfolio from '@/model/Portfolio';
import Project from '@/model/Project';
import User from '@/model/User';
import Organization from '@/model/Organization';
import Account from '@/model/Account';

interface PortfolioComponentProps {
  account: User | Organization;
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ account }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Set<Project>>(new Set());

  useEffect(() => {
    if ((account instanceof Account) && account.portfolio) {
      setPortfolio(account.portfolio);
    }
  }, [account]);

  useEffect(() => {
    if (portfolio && portfolio.projects instanceof Set && portfolio.projects.size > 0) {
      setProjects(portfolio.projects);
    }
  }, [portfolio]);

  return (
    <>
      {projects && projects.size > 0 ? (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={projects} />

          <SkillsComponent projectSkills={null} />
        </main>
      ) : <LoadingComponent />}
    </>
  );
}

export default PortfolioComponent;
