import React from 'react';

import ProjectsComponent from './ProjectsComponent';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';
import Taxonomy from '../../../model/Taxonomy';
import Project from '../../../model/Project';

interface PortfolioComponentProps {
  portfolio: Array<Project>,
  projectTypes: Array<Taxonomy>,
  languages: Array<Taxonomy>,
  frameworks: Array<Taxonomy>,
  technologies: Array<Taxonomy>
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio, projectTypes, languages, frameworks, technologies }) => {

  return (
    <>
      {portfolio && (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={portfolio} />

          <TaxList tax={projectTypes} title={'Project Types'} />

          <TaxListIcon taxonomies={languages} title={'Languages'} />

          <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />

          <TaxListIcon taxonomies={technologies} title={'Technologies'} />
        </main>
      )}
    </>
  );
}

export default PortfolioComponent;
