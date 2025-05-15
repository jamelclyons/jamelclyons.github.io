import React, { useEffect, useState } from 'react';

import ProjectStatusComponent from './Status';

import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import Project from '@/model/Project';
import ProjectStatus from '@/model/ProjectStatus';
import ProjectDesign from '@/model/ProjectDesign';
import ProjectDevelopment from '@/model/ProjectDevelopment';
import ProjectDelivery from '@/model/ProjectDelivery';

interface ProcessProps {
  project: Project;
}

const TheProcess: React.FC<ProcessProps> = ({ project }) => {
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [design, setDesign] = useState<ProjectDesign | null>(null);
  const [development, setDevelopment] = useState<ProjectDevelopment | null>(null);
  const [delivery, setDelivery] = useState<ProjectDelivery | null>(null);

  useEffect(() => {
    if (project?.process?.status) {
      setStatus(project.process.status)
    }
  }, [project?.process?.status]);

  useEffect(() => {
    if (project?.process?.design) {
      setDesign(project.process.design)
    }
  }, [project?.process?.design]);

  useEffect(() => {
    if (project?.process?.development) {
      setDevelopment(project.process.development)
    }
  }, [project?.process?.development]);

  useEffect(() => {
    if (project?.process?.delivery) {
      setDelivery(project.process.delivery)
    }
  }, [project?.process?.delivery]);

  const hasContent = status || design || development || delivery;

  return (
    <>
      {hasContent && (
        <div className="project-section project-process" id="project_process">
          <h2 className="title">the process</h2>

          {status && <ProjectStatusComponent project={project} />}

          {design && <Design project={project} />}

          {development && <Development project={project} />}

          {delivery && <Delivery project={project} />}
        </div>
      )}
    </>
  );
};

export default TheProcess;