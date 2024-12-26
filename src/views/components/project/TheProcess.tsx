import React from 'react';

import ProjectStatus from '../ProjectStatus';
import Design from './Design.tsx';
import Development from './Development.tsx';
import Delivery from './Delivery.tsx';

import ProjectProcess from '../../../model/ProjectProcess.ts';

interface ProcessProps {
  process: ProjectProcess;
}

const TheProcess: React.FC<ProcessProps> = ({ process }) => {

  return (
    <>
      {process && (
        <div className="project-process" id="project_process">
          <h3 className="title">the process</h3>

          <ProjectStatus project_status={process?.status} />

          <Design design={process?.design} />

          <Development development={process?.development} />

          <Delivery delivery={process?.delivery} />
        </div>
      )}
    </>
  );
}

export default TheProcess;
