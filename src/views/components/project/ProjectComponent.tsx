import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DescriptionComponent from '../DescriptionComponent';

import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';

import type { AppDispatch, RootState } from '@/model/store';
import Project from '@/model/Project';
import RepoContent from '@/model/RepoContent';
import GitHubRepoQuery from '@/model/GitHubRepoQuery';
import RepoContentQuery from '@/model/RepoContentQuery';

import { getRepoContents, getRepoFile } from '@/controllers/githubSlice';

interface ProjectComponentProps {
  project: Project;
  repoQuery: GitHubRepoQuery;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ project, repoQuery }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    owner, title, description, solution, process, problem, details
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
        {owner.type !== 'User' && <Details details={details} owner={owner} contributorsQuery={repoQuery} />}
      </main>
    </>
  );
}

export default ProjectComponent;
