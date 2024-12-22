import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/portfolioSlice';

function Project() {
  const { projectID } = useParams();

  const { portfolioLoading, portfolioErrorMessage, project } = useSelector(
    (state) => state.portfolio
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectID) {
      dispatch(getProject(projectID));
    }
  }, [dispatch, projectID]);

  useEffect(() => {
    document.title = project.title;
  }, [project.title]);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }
  console.log(project);
  return (
    <section className="project">
      <>
        {portfolioErrorMessage ? (
          <main className="error-page">
            <StatusBarComponent
              messageType={'error'}
              message={portfolioErrorMessage}
            />
          </main>
        ) : (
          <ProjectComponent project={project} />
        )}
      </>
    </section>
  );
}

export default Project;
