import React from 'react';

import DescriptionComponent from '../DescriptionComponent';

import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';

import Project from '@/model/Project';
import User from '@/model/User';

interface ProjectComponentProps {
  user: User;
  project: Project;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ user, project }) => {
  const {
    owner, title, description, solution, process, problem, details
  } = project;

  return (
    <>
      <main className="project">
        <h1 className="title">{title}</h1>

        <DescriptionComponent description={description} />

        <TheSolution solution={solution} />

        <TheProcess process={process} />

        <Details user={user} details={details} />

        <TheProblem problem={problem} />
      </main>
    </>
  );
}

export default ProjectComponent;
