import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/portfolioSlice';

import type { AppDispatch, RootState } from '../model/store';
import Repo from '../model/Repo';

const Project: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectID } = useParams();

  const { portfolioLoading, portfolioErrorMessage, project } = useSelector(
    (state: RootState) => state.portfolio
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

  if (portfolioLoading) {
    return <LoadingComponent />;
  }
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
