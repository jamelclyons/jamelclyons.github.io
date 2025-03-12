import React from 'react';

import ProjectStatusComponent from './Status';

import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import ProjectProcess from '@/model/ProjectProcess';

interface ProcessProps {
  process: ProjectProcess;
}

const TheProcess: React.FC<ProcessProps> = ({ process }) => {
  const { status, design, development, delivery } = process;
  
  const hasContent = status || design || development || delivery;

  return (
    <>
      {hasContent && (
        <div className="project-section project-process" id="project_process">
          <h2 className="title">the process</h2>
          {status && <ProjectStatusComponent projectStatus={status} />}
          {design && <Design design={design} />}
          {development && <Development development={development} />}
          {delivery && <Delivery delivery={delivery} />}
        </div>
      )}
    </>
  );
};

export default TheProcess;