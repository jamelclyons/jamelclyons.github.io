import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';

import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import { getProjectPage } from '@/controllers/projectSlice';

import type { AppDispatch, RootState } from '../model/store';
import Project from '../model/Project';
import GitHubRepoQuery from '../model/GitHubRepoQuery';
import Portfolio from '@/model/Portfolio';
import User from '@/model/User';

interface ProjectPageProps {
  user: User;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { owner, projectID } = useParams<string>();

  const { portfolioObject } = useSelector(
    (state: RootState) => state.portfolio
  );
  const { projectErrorMessage, projectPageObject } = useSelector(
    (state: RootState) => state.project
  );

  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery>();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject));
    }
  }, [portfolioObject, setPortfolio]);

  useEffect(() => {
    if (projectID && portfolio && portfolio?.size > 0) {
      setProject(portfolio.filterProject(projectID));
    }
  }, [projectID, portfolio, setProject]);

  useEffect(() => {
    if (owner && projectID) {
      setRepoQuery(new GitHubRepoQuery(owner, projectID))
    }
  }, [owner, projectID, setRepoQuery]);

  useEffect(() => {
    if (repoQuery) {
      dispatch(getProjectPage(repoQuery));
    }
  }, [repoQuery, dispatch]);

  useEffect(() => {
    if (projectPageObject) {
      setProject(new Project(projectPageObject));
    }
  }, [projectPageObject, setProject]);

  useEffect(() => {
    if (project) {
      document.title = project.title.toUpperCase();
    }
  }, [project]);

  useEffect(() => {
    if (projectErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(projectErrorMessage));
      dispatch(setShowStatusBar(true));
    }
  }, [projectErrorMessage, dispatch]);

  return (
    <section>
      <>
        {project ?
          <ProjectComponent user={user} project={project} /> : <LoadingComponent />
        }
      </>
    </section>
  );
}

export default ProjectPage;
