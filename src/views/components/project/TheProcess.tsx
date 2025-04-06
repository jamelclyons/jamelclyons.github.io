import React from 'react';

import ProjectStatusComponent from './Status';

import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import Project from '@/model/Project';

interface ProcessProps {
  project: Project;
}

const TheProcess: React.FC<ProcessProps> = ({ project }) => {
  const hasContent = project.process?.status || project.process?.design || project.process?.development || project.process?.delivery;

  return (
    <>
      {project.process && hasContent && (
        <div className="project-section project-process" id="project_process">
          <h2 className="title">the process</h2>

          {project.process.status && <ProjectStatusComponent project={project} />}

          {project.process.design && <Design project={project} />}

          {project.process.development && <Development project={project} />}

          {project.process.delivery && <Delivery project={project} />}
        </div>
      )}
    </>
  );
};

export default TheProcess;