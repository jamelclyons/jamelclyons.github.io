import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/projectSlice';

import type { AppDispatch, RootState } from '../model/store';
import Repo from '../model/Repo';

const Project: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectID } = useParams();

  const { projectLoading, projectErrorMessage, project } = useSelector(
    (state: RootState) => state.project
  );
  useEffect(() => {
    if (projectID) {
      let repo = new Repo();
      repo.id = projectID;
      dispatch(getProject(repo));
    }
  }, [dispatch, projectID]);

  useEffect(() => {
    if (project?.title) {
      document.title = project?.title;
    }
  }, [project?.title]);

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
          <ProjectComponent project={project} />
        )}
      </>
    </section>
  );
}

export default Project;
