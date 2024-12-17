import React from 'react';

import Gallery from './Gallery';
import ProjectStatus from './ProjectStatus';
import ProjectSkillsBar from './ProjectSkillsBar';
import ProjectDescription from './ProjectDescription';

function Projects(props) {
  const { projects } = props;
  
  return (
    <>
      {Array.isArray(projects)
        ? projects.map((project, index) => (
            // <a href={`${project.url}`}>
              <div key={index} className="project-card card">
                <h2 className='title'>{project.title}</h2>

                <Gallery gallery={project.gallery} />

                <ProjectStatus project_status={project.project_status} />

                <ProjectSkillsBar skills={project.skills} />

                <ProjectDescription description={project.description} />
              </div>
            // </a>
          ))
        : 'There are no projects to display'}
    </>
  );
}

export default Projects;
