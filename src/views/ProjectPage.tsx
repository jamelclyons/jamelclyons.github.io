import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getRepoContents, getRepoLanguages } from '../controllers/githubSlice';
import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';

import type { AppDispatch, RootState } from '../model/store';
import Project from '../model/Project';

const ProjectPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { projectLoading, projectErrorMessage } = useSelector(
    (state: RootState) => state.project
  );

  const project: Project = location.state;

  useEffect(() => {
    if (project.title) {
      document.title = project.title.toUpperCase();
    }
  }, [project]);

  useEffect(() => {
    if (project.owner && project.id) {
      dispatch(getRepoLanguages({
        owner: project.owner,
        repo: project.id,
        path: ''
      }))
    }
  }, [dispatch, project]);

  useEffect(() => {
    if (project.owner && project.id) {
      dispatch(getRepoContents({
        owner: project.owner,
        repo: project.id,
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
          <ProjectComponent project_id={project.id} />
        )}
      </>
    </section>
  );
}

export default ProjectPage;
