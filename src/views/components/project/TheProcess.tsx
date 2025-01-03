import React from 'react';

import ProjectStatusComponent from '../ProjectStatusComponent';
import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import ProjectProcess from '../../../model/ProjectProcess';

interface ProcessProps {
  process: ProjectProcess
}

const TheProcess: React.FC<ProcessProps> = ({ process }) => {
  const { status, design, development, delivery } = process;

  return (
    <>
      {process.isEmpty &&
        <div className="project-process" id="project_process">
          <h3 className="title">the process</h3>

          {!status.isEmpty && <ProjectStatusComponent projectStatus={status} />}

          {!design.isEmpty && <Design design={design} />}

          {!development.isEmpty && <Development development={development} />}

          {!delivery.isEmpty && <Delivery delivery={delivery} />}
        </div>}
    </>
  );
}

export default TheProcess;
