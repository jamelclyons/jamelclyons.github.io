import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/projectSlice';
import { getRepo } from '../controllers/githubSlice';

import type { AppDispatch, RootState } from '../model/store';

import { setMessage, setMessageType } from '../controllers/messageSlice';

const ProjectPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectID } = useParams();

  const { projectLoading, projectErrorMessage, title, description, solution, process, status, design, development, delivery, problem, details } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    if (projectID) {
      dispatch(getRepo({ owner: 'the7ofdiamonds', repo: projectID }))
        .unwrap()
        .then((repo) => {
          if (repo) {
            dispatch(getProject(repo));
          }
        })
        .catch((error) => {
          const err = error as Error;
          console.error('Failed to fetch repo:', err);
          setMessage(err.message);
          setMessageType('error');
        });
    }
  }, [dispatch, projectID]);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

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
          <ProjectComponent
            title={title}
            description={description}
            solution={solution}
            process={process}
            status={status}
            design={design}
            development={development}
            delivery={delivery}
            problem={problem}
            details={details}
          />
        )}
      </>
    </section>
  );
}

export default ProjectPage;
