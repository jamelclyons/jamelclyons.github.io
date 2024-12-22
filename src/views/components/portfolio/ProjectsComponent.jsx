import React from 'react';

import Gallery from '../Gallery';
import ProjectStatus from '../ProjectStatus';
import ProjectDescription from './ProjectDescription';
import StatusBarComponent from '../StatusBarComponent';

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

            {Array.isArray(project.solution.gallery) &&
            project.solution.gallery.length > 0 ? (
              <div className="gallery">
                <span className="gallery-photo">
                  <img
                    className="photo"
                    src={project.solution.gallery[0]}
                    alt=""
                  />
                </span>
              </div>
            ) : (
              ''
            )}
            
            <ProjectDescription description={project.description} />

            {project.process && (
              <ProjectStatus project_status={project.process?.status} />
            )}
          </div>
        ))
      ) : (
        <StatusBarComponent />
      )}
    </>
  );
}

export default ProjectsComponent;
