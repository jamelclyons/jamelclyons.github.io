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
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [design, setDesign] = useState<ProjectDesign | null>(null);
  const [development, setDevelopment] = useState<ProjectDevelopment | null>(null);
  const [delivery, setDelivery] = useState<ProjectDelivery | null>(null);

  useEffect(() => { if (process.status) { setStatus(process.status) } }, [process, setStatus]);

  useEffect(() => { if (process.design) { setDesign(process.design) } }, [process, setDesign]);

  useEffect(() => { if (process.development) { setDevelopment(process.development) } }, [process, setDevelopment]);

  useEffect(() => { if (process.delivery) { setDelivery(process.delivery) } }, [process, setDelivery]);

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