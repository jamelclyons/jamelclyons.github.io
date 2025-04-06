import React, { useEffect, useState } from 'react';

import Details from './Details';
import DescriptionComponent from '../DescriptionComponent';
import TheSolution from './TheSolution';
import TheProcess from './TheProcess';
import TheProblem from './TheProblem';
import OwnerComponent from './OwnerComponent';

import Project from '@/model/Project';
import User from '@/model/User';

interface ProjectComponentProps {
  user: User;
  project: Project;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ user, project }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => { setTitle(project.title) }, [project]);

  useEffect(() => { setSubtitle(project.subtitle) }, [project]);

  useEffect(() => { setDescription(project.description) }, [project]);

  return (
    <>
      <main className="project">
        {title && <h1 className="title">{title}</h1>}

        {subtitle && <h2>{subtitle}</h2>}

        {description && <DescriptionComponent description={description} />}

        {project.solution && <TheSolution project={project} />}

        {project.process && <TheProcess project={project} />}

        {project.details && <Details user={user} project={project} />}

        {project.problem && <TheProblem project={project} />}

        {project.owner && <OwnerComponent project={project} />}
      </main>
    </>
  );
}

export default ProjectComponent;
