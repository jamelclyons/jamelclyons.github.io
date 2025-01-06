import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { marked } from 'marked';

import DescriptionComponent from '../DescriptionComponent';

import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';

import type { AppDispatch, RootState } from '../../../model/store';
import Project from '../../../model/Project';
import RepoContent from '../../../model/RepoContent';

import { getRepo, getRepoContents, getRepoLanguages } from '../../../controllers/githubSlice';

interface ProjectComponentProps {
  project_id: string
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ project_id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const project = location.state as Project;
  const {
    title, description, solution, process, problem, details
  } = project;

  const { contents } = useSelector(
    (state: RootState) => state.github
  );

  const [problemContent, setProblemContent] = useState<RepoContent>(new RepoContent);
  const [content, setContent] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {

    const contents = dispatch(getRepoContents({
      // owner: project.owner,
      owner: 'the7ofdiamonds',
      repo: project_id,
      path: ''
    })).unwrap();
  }, [dispatch, project_id]);

  useEffect(() => {
    if (Array.isArray(contents) && contents.length > 0) {
      contents.forEach((content) => {
        if (content.name === 'TheProblem.md') {
          setProblemContent(new RepoContent(content));
        }
      });
    }
  }, [contents]);
  
  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(problemContent.downloadURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown file: ${response.statusText}`);
        }
        const markdown = await response.text();

        problem.content = marked(markdown).valueOf();
      } catch (error) {
        console.error('Error fetching markdown file:', error);
      }
    };

    fetchMarkdown();
  }, [problemContent.downloadURL]);

  console.log(problem)
  return (
    <>
      <main className="project">
        {title !== '' && <h1 className="title">{title}</h1>}

        <DescriptionComponent description={description} />

        <TheSolution solution={solution} />

        <TheProcess process={process} />

        <TheProblem problem={problem} />

        {/* Project details is for clients only */}
        <Details details={details} />
      </main>
    </>
  );
}

export default ProjectComponent;
