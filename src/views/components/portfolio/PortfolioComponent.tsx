import React from 'react';

import ProjectsComponent from './ProjectsComponent';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';

import Portfolio from '../../../model/Portfolio';

interface PortfolioComponentProps {
  portfolio: Portfolio;
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio }) => {
  const { projects, projectTypes, languages, frameworks, technologies } = portfolio;

  return (
    <>
      {projects.size > 0 && (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={projects} />

          {projectTypes.size > 0 && <TaxList taxonomies={projectTypes} title={'Project Types'} />}

          {languages.size > 0 && <TaxListIcon taxonomies={languages} title={'Languages'} />}

          {frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />}

          {technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'Technologies'} />}
        </main>
      )}
    </>
  );
}

export default PortfolioComponent;
