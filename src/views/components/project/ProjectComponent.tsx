import React, { useEffect, useState } from 'react';

import Details from './Details';
import DescriptionComponent from '../DescriptionComponent';
import TheSolution from './TheSolution';
import TheProcess from './TheProcess';
import TheProblem from './TheProblem';
import OwnerComponent from './OwnerComponent';

import Project from '@/model/Project';
import User from '@/model/User';
import ProjectSolution from '@/model/ProjectSolution';
import ProjectProblem from '@/model/ProjectProblem';
import ProjectDetails from '@/model/ProjectDetails';
import ProjectProcess from '@/model/ProjectProcess';
import Owner from '@/model/Owner';

interface ProjectComponentProps {
  user: User;
  project: Project;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ user, project }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [solution, setSolution] = useState<ProjectSolution | null>(null);
  const [process, setProcess] = useState<ProjectProcess | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null)
  const [problem, setProblem] = useState<ProjectProblem | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => { setTitle(project.title) }, [project, setTitle]);

  useEffect(() => { setSubtitle(project.subtitle) }, [project, setSubtitle]);

  useEffect(() => { setDescription(project.description) }, [project, setDescription]);

  useEffect(() => { setSolution(project.solution) }, [project, setSolution]);

  useEffect(() => { setProcess(project.process) }, [project, setProcess]);

  useEffect(() => { setDetails(project.details) }, [project, setDetails]);

  useEffect(() => { setProblem(project.problem) }, [project, setProblem]);

  useEffect(() => { setOwner(project.owner) }, [project, setOwner]);

  return (
    <>
      <main className="project">
        <h1 className="title">{title}</h1>

        <h2>{subtitle}</h2>

        {description && <DescriptionComponent description={description} />}

        {solution && <TheSolution solution={solution} />}

        {process && <TheProcess process={process} />}

        {details && <Details user={user} details={details} />}

        {problem && <TheProblem problem={problem} />}

        {owner && <OwnerComponent owner={owner} />}
      </main>
    </>
  );
}

export default ProjectComponent;
