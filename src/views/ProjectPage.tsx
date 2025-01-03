import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/projectSlice';
import { getRepo, getRepoContents, getRepoLanguages } from '../controllers/githubSlice';

import type { AppDispatch, RootState } from '../model/store';
import Repo from '../model/Repo';

import { setMessage, setMessageType } from '../controllers/messageSlice';

interface ProjectPageProps {
  repo: Repo
}

const ProjectPage: React.FC<ProjectPageProps> = ({ repo }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectID } = useParams();

  const { projectLoading, projectErrorMessage, project } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    if (projectID) {
      const repo = new Repo({ name: projectID });

      dispatch(getProject(repo))
    }
  }, [dispatch, projectID]);

  useEffect(() => {
    if (project.title) {
      document.title = project.title;
    }
  }, [project.title]);

  useEffect(() => {
    if (project.owner && projectID) {
      dispatch(getRepoContents({
        owner: project.owner,
        repo: projectID,
        path: ''
      }))
    }
  }, [dispatch, project.owner, projectID]);

  useEffect(() => {
    if (project.owner && projectID) {

      dispatch(getRepoLanguages({
        owner: project.owner,
        repo: projectID,
        path: ''
      }))
    }
  }, [dispatch, project.owner, projectID]);

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
          <ProjectComponent />
        )}
      </>
    </section>
  );
}

export default ProjectPage;
