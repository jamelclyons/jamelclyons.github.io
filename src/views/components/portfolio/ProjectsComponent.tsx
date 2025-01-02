import React from 'react';

import StatusBarComponent from '../StatusBarComponent';

import Project from '../../../model/Project';
import PortfolioProject from './PortfolioProject';

interface ProjectsComponentProps {
  projects: Set<Project>;
}

const ProjectsComponent: React.FC<ProjectsComponentProps> = ({ projects }) => {
  return (
    <>
      {projects.size > 0 && (
        Array.from(projects).map((project) => (
          <PortfolioProject project={project} />
        ))
      )}
    </>
  );
}

export default ProjectsComponent;
