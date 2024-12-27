import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/portfolioSlice';

import type { AppDispatch, RootState } from '../model/store';

import User from '../model/User';

const Project = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectID } = useParams();

  const { portfolioLoading, portfolioErrorMessage, project } = useSelector(
    (state: RootState) => state.portfolio
  );

  useEffect(() => {
    if (projectID) {
      dispatch(getProject(projectID));
    }
  }, [dispatch, projectID]);

  useEffect(() => {
    if (project?.title) {
      document.title = project?.title;
    }
  }, [project?.title]);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }
  console.log(project);
  return (
    <section className="project">
      <>
        {portfolioErrorMessage ? (
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
