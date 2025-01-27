import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getRepo, getRepoContents, getRepoLanguages, getRepoFile } from '../controllers/githubSlice';
import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import { getProject } from '@/controllers/projectSlice';

import type { AppDispatch, RootState } from '../model/store';
import Project from '../model/Project';
import GitHubRepoQuery from '../model/GitHubRepoQuery';
import Portfolio from '@/model/Portfolio';
import Repo from '@/model/Repo';
import RepoContentQuery from '@/model/RepoContentQuery';

interface ProjectPageProps {
  portfolio: Portfolio;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { owner, projectID } = useParams<string>();

  const { repoObject, repoLanguages } = useSelector(
    (state: RootState) => state.github
  );
  const { projectLoading, projectErrorMessage, projectObject } = useSelector(
    (state: RootState) => state.project
  );

  const [project, setProject] = useState<Project>();
  const [repoQuery, setRepoQuery] = useState<GitHubRepoQuery>();
  const [repo, setRepo] = useState<Repo>();
  const [solutionContent, setSolutionContent] = useState<string>();

  useEffect(() => {
    if (owner && projectID) {
      setRepoQuery(new GitHubRepoQuery(owner, projectID))
    }
  }, [owner, projectID]);

  useEffect(() => {
    if (repoQuery) {
      dispatch(getRepo(repoQuery));
    }
  }, [dispatch, repoQuery]);

  useEffect(() => {
    if (repoObject) {
      setRepo(new Repo(repoObject));
    }
  }, [dispatch, repoObject]);

  useEffect(() => {
    if (repo) {
      dispatch(getRepoLanguages(repo));
    }
  }, [dispatch, repo]);

  useEffect(() => {
    if (repo && repoLanguages) {
      repo.setSkills(repoLanguages)
      setRepo(repo);
    }
  }, [repo, repoLanguages]);

  useEffect(() => {
    if (repo) {
      dispatch(getProject(repo));
    }
  }, [repo, dispatch]);

  useEffect(() => {
    if (project?.id === undefined && projectObject) {
      setProject(new Project(projectObject));
    }
  }, [projectObject]);

  useEffect(() => {
    if (project) {
      document.title = project.title.toUpperCase();
    }
  }, [project]);

  useEffect(() => {
    if (portfolio.projects.size > 0 && projectID) {
      const filteredProject = portfolio.filterProject(projectID);

      if (solutionContent) {
        filteredProject.solution.content = solutionContent;
      }

      setProject(filteredProject);
    }
  }, [portfolio.projects, projectID]);

  useEffect(() => {
    if (project) {

    }
  }, [project]);

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
          project && repoQuery && <ProjectComponent project={project} repoQuery={repoQuery} />
        )}
      </>
    </section>
  );
}

export default ProjectPage;
