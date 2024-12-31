import React, { Component, lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '../../../model/store';
import { useAppSelector } from '../../../model/hooks';

import CheckList from './CheckList';
import ContentComponent from '../ContentComponent';
import ProjectURLs from './ProjectURLsComponent';
import Versions from './Versions';

import type { RepoQuery } from '../../../controllers/githubSlice';
import { getRepo } from '../../../controllers/githubSlice';

import ProjectDevelopment from '../../../model/ProjectDevelopment';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { repo } = useAppSelector((state: RootState) => state.github);

  useEffect(() => {
    if (development?.repoURL) {
      try {
        const repoURL = new URL(development.repoURL);
        const pathname = repoURL.pathname;
        const parts = pathname.split('/').filter(Boolean); // Remove empty parts

        if (parts.length >= 2) {
          const query: RepoQuery = {
            owner: parts[0], // GitHub username or organization
            repo: parts[1],  // Repository name
          };

          dispatch(getRepo(query));
        } else {
          console.error('Invalid repository URL');
        }
      } catch (error) {
        const err = error as Error;
        console.error('Invalid URL format:', err.message);
      }
    }
  }, [development, dispatch]);

  return (
    <>
      <div
        className="project-process-development"
        id="project_process_development">
        <h4 className="title">development</h4>


        <CheckList checkList={development?.checkList} />

        <ContentComponent content={development?.content} />

        <h3>Project Last Updated: {repo?.data?.updated_at}</h3>

        <ProjectURLs project_urls={development?.repoURL} />

        {/* <Versions versions_list={development?.versionsList} /> */}
      </div>
    </>
  );
}

export default Development;
