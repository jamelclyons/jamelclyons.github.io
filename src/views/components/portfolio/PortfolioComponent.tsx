import React from 'react';

import ProjectsComponent from './ProjectsComponent';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';

import Taxonomy from '../../../model/Taxonomy';
import Project from '../../../model/Project';
import Portfolio from '../../../model/Portfolio';

interface PortfolioComponentProps {
  portfolio: Portfolio;
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio }) => {
  const { projects, projectTypes, languages, frameworks, technologies } = portfolio;

  return (
    <>
      {projects && (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={projects} />

          <TaxList taxonomies={projectTypes} title={'Project Types'} />

          <TaxListIcon taxonomies={languages} title={'Languages'} />

          <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />

          <TaxListIcon taxonomies={technologies} title={'Technologies'} />
        </main>
      )}
    </>
  );
}

export default PortfolioComponent;
