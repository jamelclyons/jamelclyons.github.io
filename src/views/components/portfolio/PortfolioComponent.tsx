import React from 'react';
import { useSelector } from 'react-redux';

import LoadingComponent from '../LoadingComponent';
import ProjectsComponent from './ProjectsComponent';
import SkillsComponent from '../SkillsComponent';

import type { RootState } from '@/model/store';
import Portfolio from '@/model/Portfolio';
import Skills from '@/model/Skills';

interface PortfolioComponentProps {
  portfolio: Portfolio;
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio }) => {
  const { projects } = portfolio;

  return (
    <>
      {projects.size > 0 && (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={projects} />

          <SkillsComponent skillsUsed={null} />
        </main>
      )}
    </>
  );
}

export default PortfolioComponent;
