import React from 'react';

import DescriptionComponent from '../DescriptionComponent';

import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';

import Project from '@/model/Project';
import GitHubRepoQuery from '@/model/GitHubRepoQuery';

interface ProjectComponentProps {
  project: Project;
  repoQuery: GitHubRepoQuery;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ project, repoQuery }) => {
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

        <TheProblem problem={problem} />

        {/* Project details is for clients only */}
        {owner.type !== 'User' && <Details details={details} owner={owner} contributorsQuery={repoQuery} />}
      </main>
    </>
  );
}

export default ProjectComponent;
