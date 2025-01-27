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

  const { contents } = useSelector(
    (state: RootState) => state.github
  );

  const [solutionContent, setSolutionContent] = useState<RepoContent | null>(null);
  const [designContent, setDesignContent] = useState<RepoContent | null>(null);
  const [developmentContent, setDevelopmentContent] = useState<RepoContent | null>(null);
  const [deliveryContent, setDeliveryContent] = useState<RepoContent | null>(null);
  const [problemContent, setProblemContent] = useState<RepoContent | null>(null);

  useEffect(() => {
    dispatch(getRepoContents(repoQuery));
  }, []);

  useEffect(() => {
    if (Array.isArray(contents) && contents.length > 0) {
      contents.map((content) => {
        if (content.type === 'file') {
          if (content.name === 'TheSolution.md') {
            setSolutionContent(new RepoContent(content));
          }

          if (content.name === 'Design.md') {
            setDesignContent(new RepoContent(content));
          }

          if (content.name === 'Development.md') {
            setDevelopmentContent(new RepoContent(content));
          }

          if (content.name === 'Delivery.md') {
            setDeliveryContent(new RepoContent(content));
          }

          if (content.name === 'TheProblem.md') {
            setProblemContent(new RepoContent(content));
          }
        }
      });
    }
  }, [contents]);

  const getContentObject = async (url: string) => {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    const query = new RepoContentQuery(parts[1], parts[2], parts[4], parts[3]);
    return await dispatch(getRepoFile(query)).unwrap();
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (solutionContent) {
        const content = await getContentObject(solutionContent.downloadURL);
        project.solution.content = content;
      }
    }

    fetchContent();
  }, [solutionContent]);

  useEffect(() => {
    const fetchContent = async () => {
      if (designContent) {

        const content = await getContentObject(designContent.downloadURL);
        project.process.design.content = content;
      }
    }

    fetchContent();
  }, [designContent]);

  useEffect(() => {
    const fetchContent = async () => {
      if (developmentContent) {

        const content = await getContentObject(developmentContent.downloadURL);
        project.process.development.content = content;
      }
    }

    fetchContent();
  }, [developmentContent]);

  useEffect(() => {
    const fetchContent = async () => {
      if (deliveryContent) {

        const content = await getContentObject(deliveryContent.downloadURL);
        project.process.delivery.content = content;
      }
    }

    fetchContent();
  }, [deliveryContent]);

  useEffect(() => {
    const fetchContent = async () => {
      if (problemContent) {

        const content = await getContentObject(problemContent.downloadURL);
        project.problem.content = content;
      }
    }

    fetchContent();
  }, [problemContent]);  

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
