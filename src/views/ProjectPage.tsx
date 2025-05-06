import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';

import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import { getProject } from '@/controllers/projectSlice';

import type { AppDispatch, RootState } from '@/model/store';
import Project from '@/model/Project';
import GitHubRepoQuery from '@/model/GitHubRepoQuery';
import User from '@/model/User';

interface ProjectPageProps {
  user: User;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { owner, projectID } = useParams<string>();

  const { projectErrorMessage, projectObject } = useSelector(
    (state: RootState) => state.project
  );

  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (owner && projectID) {
      setRepoQuery(new GitHubRepoQuery(owner, projectID))
    }
  }, [owner, projectID]);

  useEffect(() => {
    if (repoQuery) {
      dispatch(getProject(repoQuery));
    }
  }, [repoQuery]);

  useEffect(() => {
    if (projectObject) {
      setProject(new Project(projectObject));
    }
  }, [projectObject]);

  useEffect(() => {
    if (project && project.title) {
      document.title = project.title.toUpperCase();
    }
  }, [project]);

  useEffect(() => {
    if (projectErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(projectErrorMessage));
      dispatch(setShowStatusBar(true));
    }
  }, [projectErrorMessage]);

  return (
    <section>
      <>
        {project ?
          <ProjectComponent user={user} project={project} /> : <LoadingComponent />
        }
      </>
    </section>
  );
}

export default ProjectPage;
