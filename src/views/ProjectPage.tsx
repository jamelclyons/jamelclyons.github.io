import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';

import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import { getProject } from '@/controllers/projectSlice';

import type { AppDispatch, RootState } from '../model/store';
import Project from '../model/Project';
import GitHubRepoQuery from '../model/GitHubRepoQuery';
import Portfolio from '@/model/Portfolio';
import User from '@/model/User';

interface ProjectPageProps {
  user: User;
  portfolio: Portfolio;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ user, portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { owner, projectID } = useParams<string>();

  const { projectPageLoading, projectErrorMessage, projectPageObject } = useSelector(
    (state: RootState) => state.project
  );

  const [project, setProject] = useState<Project>();
  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery>();

  useEffect(() => {
    if (projectID) {
      const filteredProject = portfolio.filterProject(projectID);
      setProject(filteredProject);
    }
  }, [projectID]);

  useEffect(() => {
    if (owner && projectID) {
      setRepoQuery(new GitHubRepoQuery(owner, projectID))
    }
  }, [owner, projectID]);

  useEffect(() => {
    if (repoQuery) {
      dispatch(getProject(repoQuery));
    }
  }, [dispatch, repoQuery]);

  useEffect(() => {
    if (projectPageObject) {
      setProject(new Project(projectPageObject));
    }
  }, [projectPageObject]);

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

  if (projectPageLoading) {
    return (
      <section className="project">
        <>
          <LoadingComponent />
        </>
      </section>);
  }

  return (
    <section className="project">
      <>
        {project ?
          <ProjectComponent user={user} project={project} /> : <LoadingComponent />
        }
      </>
    </section>
  );
}

export default ProjectPage;
