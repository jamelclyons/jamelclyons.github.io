import React from 'react';

import Gallery from './Gallery';
import ProjectStatus from './ProjectStatus';
import ProjectSkillsBar from './ProjectSkillsBar';
import ProjectDescription from './ProjectDescription';
import StatusBarComponent from './StatusBarComponent';

function ProjectsComponent(props) {
  const { projects } = props;
console.log(projects);
  return (
    <>
      {Array.isArray(projects) ? (
        projects.map((project, index) => (
          <div key={index} className="project-card card">
            <a href={`#/portfolio/${project.id}`}>
              <h2 className="title">{project.title}</h2>
            </a>

            <Gallery gallery={project.solutionsGallery ?? project.designGallery} />

            <ProjectStatus project_status={project.status} />

            <ProjectSkillsBar skills={project.languages} />

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
