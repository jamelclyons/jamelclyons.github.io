import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';

import type { AppDispatch, RootState } from '../model/store';
import Project from '../model/Project';
import GitHubRepoQuery from '../model/GitHubRepoQuery';
import Portfolio from '@/model/Portfolio';

interface ProjectPageProps {
  portfolio: Portfolio;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { owner, projectID } = useParams<string>();

  const { projectLoading, projectErrorMessage } = useSelector(
    (state: RootState) => state.project
  );

  const [project, setProject] = useState<Project>();
  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery>();

  useEffect(() => {
    if (owner && projectID) {
      setRepoQuery(new GitHubRepoQuery(owner, projectID))
    }
  }, [owner, projectID]);

  useEffect(() => {
    if (projectID) {
      setProject(portfolio.filterProject(projectID));
    }
  }, [portfolio, projectID]);

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
  }, [dispatch, projectErrorMessage]);

  if (projectLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className="project">
      <>
        {projectErrorMessage ? (
          <main className="error-page">
            <StatusBarComponent />
          </main>
        ) : (
          project && repoQuery && <ProjectComponent project={project} repoQuery={repoQuery} />
        )}
      </>
    </section>
  );
}

export default ProjectPage;
