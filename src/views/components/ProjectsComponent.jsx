import React from 'react';

import Gallery from './Gallery';
import ProjectStatus from './ProjectStatus';
import ProjectSkillsBar from './ProjectSkillsBar';
import ProjectDescription from './ProjectDescription';

function ProjectsComponent(props) {
  const { projects } = props;
  console.log(projects);
  return (
    <>
      {Array.isArray(projects)
        ? projects.map((project, index) => (
            <div key={index} className="project-card card">
              <a href={`#/portfolio/${project.project_slug}`}>
                <h2 className="title">{project.title}</h2>
              </a>

              <Gallery gallery={project.gallery} />

              <ProjectStatus project_status={project.project_status} />

              <ProjectSkillsBar skills={project.skills} />

              <ProjectDescription description={project.description} />
            </div>
          ))
        : 'There are no projects to display'}
    </>
  );
}

export default ProjectsComponent;
