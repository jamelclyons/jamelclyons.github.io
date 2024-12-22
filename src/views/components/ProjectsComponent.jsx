import React from 'react';

import Gallery from './Gallery';
import ProjectStatus from './ProjectStatus';
import ProjectSkillsBar from './ProjectSkillsBar';
import ProjectDescription from './ProjectDescription';
import StatusBarComponent from './StatusBarComponent';

function ProjectsComponent(props) {
  const { projects } = props;

  return (
    <>
      {Array.isArray(projects) ? (
        projects.map((project, index) => (
          <div key={index} className="project-card card">
            <a href={`#/portfolio/${project.project_slug ?? project.id}`}>
              <h2 className="title">{project.title}</h2>
            </a>

            <Gallery gallery={project.gallery} />

            <ProjectStatus project_status={project.project_status} />

            <ProjectSkillsBar skills={project.skills} />

            <ProjectDescription description={project.description} />
          </div>
        ))
      ) : (
        <StatusBarComponent />
      )}
    </>
  );
}

export default ProjectsComponent;
