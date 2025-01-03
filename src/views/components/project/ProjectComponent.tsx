import React from 'react';

import DescriptionComponent from '../DescriptionComponent';

import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';

import Project from '../../../model/Project';

import { useLocation } from 'react-router';


const ProjectComponent: React.FC = () => {
  const location = useLocation();

  const project = location.state as Project;
  const {
    title, description, solution, process, problem, details
  } = project;

  return (
    <>
      <main className="project">
        {title !== '' && <h1 className="title">{title}</h1>}

        <DescriptionComponent description={description} />

        <TheSolution solution={solution} />

        <TheProcess process={process} />

        <TheProblem problem={problem} />

        {/* Project details is for clients only */}
        <Details project_details={details} />
      </main>
    </>
  );
}

export default ProjectComponent;
