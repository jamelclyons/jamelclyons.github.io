import React from 'react';

import Project from '@/model/Project';
import PortfolioProject from './PortfolioProject';

interface ProjectsComponentProps {
  projects: Set<Project>;
}

const ProjectsComponent: React.FC<ProjectsComponentProps> = ({ projects }) => {

  return (
    <>
      <div className="projects">
        {projects.size > 0 && (
          Array.from(projects).map((project, index) => (
            <PortfolioProject key={index} project={project} />
          ))
        )}
      </div>
    </>
  );
}

export default ProjectsComponent;
