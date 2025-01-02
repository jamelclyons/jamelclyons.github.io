import React from 'react';

import ProjectDescription from '../portfolio/ProjectDescription';

import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';

import ProjectSolution from '../../../model/ProjectSolution';
import ProjectProcess from '../../../model/ProjectProcess';
import ProjectStatus from '../../../model/ProjectStatus';
import ProjectDesign from '../../../model/ProjectDesign';
import ProjectDevelopment from '../../../model/ProjectDevelopment';
import ProjectDelivery from '../../../model/ProjectDelivery';
import ProjectProblem from '../../../model/ProjectProblem';
import ProjectDetails from '../../../model/ProjectDetails';

interface ProjectProps {
  title: string;
  description: string;
  solution: ProjectSolution;
  process: ProjectProcess;
  status: ProjectStatus;
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;
  problem: ProjectProblem;
  details: ProjectDetails;
}

const ProjectComponent: React.FC<ProjectProps> = ({
  title, description, solution, process, status, design, development, delivery, problem, details
}) => {

  return (
    <>
      <main className="project">
        {title && <h1 className="title">{title}</h1>}

        <ProjectDescription description={description} />

        {solution && <TheSolution solution={solution} />}

        {process &&
          <TheProcess
            status={status}
            design={design}
            development={development}
            delivery={delivery}
          />}

        {problem && <TheProblem problem={problem} />}

        {/* Project details is for clients only */}
        {details && <Details project_details={details} />}
      </main>
    </>
  );
}

export default ProjectComponent;
