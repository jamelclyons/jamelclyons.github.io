import React from 'react';

import ProjectStatusComponent from '../ProjectStatusComponent';
import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import ProjectStatus from '../../../model/ProjectStatus';
import ProjectDesign from '../../../model/ProjectDesign';
import ProjectDevelopment from '../../../model/ProjectDevelopment';
import ProjectDelivery from '../../../model/ProjectDelivery';

interface ProcessProps {
  status: ProjectStatus;
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;
}

const TheProcess: React.FC<ProcessProps> = ({ status, design, development, delivery }) => {

  return (
    <>
      <div className="project-process" id="project_process">
        <h3 className="title">the process</h3>

        {!status.isEmpty() && <ProjectStatusComponent projectStatus={status} />}

        {!design.isEmpty() && <Design design={design} />}

        {!development.isEmpty() && <Development development={development} />}

        {!delivery.isEmpty() && <Delivery delivery={delivery} />}
      </div>
    </>
  );
}

export default TheProcess;
