import React from 'react';

import ProjectStatus from '../ProjectStatus';
import ProjectDescription from './ProjectDescription';
import StatusBarComponent from '../StatusBarComponent';

import Project from '../../../model/Project';

interface ProjectsComponentProps {
  projects: Set<Project>;
}

const ProjectsComponent: React.FC<ProjectsComponentProps> = ({ projects }) => {
  return (
    <>
      {projects.size > 0 && (
        Array.from(projects).map((project, index) => (
          <a href={`#/portfolio/${project.id}`}>
            <div key={index} className="project-card card">
              <h2 className="title">{project.title}</h2>

              {Array.isArray(project.solution?.gallery) &&
                project.solution?.gallery.length > 0 ? (
                <img
                  className="photo"
                  src={project.solution?.gallery[0].url}
                  alt={project.solution?.gallery[0].title}
                />
              ) : (
                ''
              )}

              <ProjectDescription description={project.description} />

              {project.process && (
                <ProjectStatus projectStatus={project.process.status} />
              )}
            </div>
          </a>
        ))
      )}
    </>
  );
}

export default ProjectsComponent;
