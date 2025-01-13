import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getRepoContents } from '../controllers/githubSlice';
import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';

import type { AppDispatch, RootState } from '../model/store';
import Project from '../model/Project';
import GitHubRepoQuery from '../model/GitHubRepoQuery';

const ProjectPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { projectLoading, projectErrorMessage } = useSelector(
    (state: RootState) => state.project
  );

  const project: Project = location.state;

  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery>(new GitHubRepoQuery(project.owner.login, project.id));

  useEffect(() => {
    if (project) {
      setRepoQuery(new GitHubRepoQuery(project.owner.login, project.id))
    }
  }, [project]);

  useEffect(() => {
    if (project.title) {
      document.title = project.title.toUpperCase();
    }
  }, [project]);

  useEffect(() => {
    if (repoQuery) {
      dispatch(getRepoContents({
        owner: repoQuery.owner,
        repo: repoQuery.repo,
        path: ''
      }));
    }
  }, [dispatch, project]);

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
          project && <ProjectComponent project={project} repoQuery={repoQuery} />
        )}
      </>
    </section>
  );
}

export default ProjectPage;
