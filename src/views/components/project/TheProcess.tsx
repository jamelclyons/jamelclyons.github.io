import React, { useEffect, useState } from 'react';

import ProjectStatusComponent from './Status';

import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import ProjectProcess from '@/model/ProjectProcess';
import ProjectStatus from '@/model/ProjectStatus';
import ProjectDesign from '@/model/ProjectDesign';
import ProjectDevelopment from '@/model/ProjectDevelopment';
import ProjectDelivery from '@/model/ProjectDelivery';

interface ProcessProps {
  process: ProjectProcess;
}

const TheProcess: React.FC<ProcessProps> = ({ process }) => {
  const [status, setStatus] = useState<ProjectStatus>(process.status);
  const [design, setDesign] = useState<ProjectDesign>(process.design);
  const [development, setDevelopment] = useState<ProjectDevelopment>(process.development);
  const [delivery, setDelivery] = useState<ProjectDelivery>(process.delivery);

  useEffect(() => { setStatus(process.status) }, [process.status, setStatus]);

  useEffect(() => { setDesign(process.design) }, [process.design, setDesign]);

  useEffect(() => { setDevelopment(process.development) }, [process.development, setDevelopment]);

  useEffect(() => { setDelivery(process.delivery) }, [process.delivery, setDelivery]);

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