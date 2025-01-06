import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/projectSlice';
import { getRepo, getRepoContents, getRepoLanguages } from '../controllers/githubSlice';
import { setMessage, setMessageType } from '../controllers/messageSlice';

import type { AppDispatch, RootState } from '../model/store';
import Repo from '../model/Repo';
import RepoContent from '../model/RepoContent';

const ProjectPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectID } = useParams();

  const { projectLoading, projectErrorMessage, project } = useSelector(
    (state: RootState) => state.project
  );
  const { contents } = useSelector(
    (state: RootState) => state.github
  );

  const [problem, setProblem] = useState<RepoContent>(new RepoContent);

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
          <ProjectComponent project_id={projectID ?? 'jamelclyons'} />
        )}
      </>
    </section>
  );
}

export default ProjectPage;
