import React from 'react';

import ProjectStatus from '../ProjectStatus';
import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import ProjectProcess from '../../../model/ProjectProcess';

interface ProcessProps {
  process: ProjectProcess;
}

const TheProcess: React.FC<ProcessProps> = ({ process }) => {

  return (
    <>
      {process && (
        <div className="project-process" id="project_process">
          <h3 className="title">the process</h3>

          <ProjectStatus projectStatus={process?.status} />

          <Design design={process?.design} />

          <Development development={process?.development} />

          <Delivery delivery={process?.delivery} />
        </div>
      )}
    </>
  );
}

export default TheProcess;
