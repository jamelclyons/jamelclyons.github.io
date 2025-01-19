import React from 'react';

import ProjectsComponent from './ProjectsComponent';
import SkillsComponent from '../SkillsComponent';

import Portfolio from '@/model/Portfolio';
import Skills from '@/model/Skills';

interface PortfolioComponentProps {
  portfolio: Portfolio;
  skills: Skills;
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio, skills }) => {
  const { projects } = portfolio;

  return (
    <>
      {projects.size > 0 && skills && (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={projects} />

          {skills && <SkillsComponent skills={skills} />}
        </main>
      )}
    </>
  );
}

export default PortfolioComponent;
