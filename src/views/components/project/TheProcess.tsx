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
      {(status || design || development || delivery) &&
        <div className="project-process" id="project_process">
          <h3 className="title">the process</h3>

          <ProjectStatusComponent projectStatus={status} />

          <Design design={design} />

          <Development development={development} />

          <Delivery delivery={delivery} />
        </div>}
    </>
  );
}

export default TheProcess;
