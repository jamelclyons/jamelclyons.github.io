import React, { Component, lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '../../../model/store';
import { useAppSelector } from '../../../model/hooks';

import CheckList from './CheckList';
import ContentComponent from '../ContentComponent';
import ProjectURLs from './ProjectURLsComponent';
import Versions from './Versions';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';

import type { RepoQuery } from '../../../controllers/githubSlice';
import { getRepo } from '../../../controllers/githubSlice';
import {
  getProjectType,
  getLanguage,
  getFramework,
  getTechnology,
} from '../../../controllers/taxonomiesSlice';

import ProjectDevelopment from '../../../model/ProjectDevelopment';
import Taxonomy from '../../../model/Taxonomy';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkList, content, repoURL, types, languages, frameworks, technologies } = development;

  useEffect(() => {
    if (repoURL) {
      try {
        const repoUrl = new URL(repoURL);
        const pathname = repoUrl.pathname;
        const parts = pathname.split('/').filter(Boolean);

        if (parts.length >= 2) {
          const query: RepoQuery = {
            owner: parts[0],
            repo: parts[1]
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

  let taxTypes: Set<Taxonomy> = new Set();
  let taxLanguages: Set<Taxonomy> = new Set();
  let taxFrameworks: Set<Taxonomy> = new Set();
  let taxTechnologies: Set<Taxonomy> = new Set();

  useEffect(() => {
    if (types) {
      const fetchProjectTypes = async () => {
        try {
          await Promise.all(
            Array.from(types).map(async (tax) => {
              const result = (await dispatch(getProjectType(tax)));

              if (getProjectType.fulfilled.match(result)) {
                const taxonomy = result.payload as Taxonomy;
                taxTypes.add(taxonomy);
              } else {
                console.error("Failed to fetch project type:", result.error);
                return null;
              }
            })
          );
        } catch (error) {
          console.error("Error fetching project types:", error);
        }
      };

      fetchProjectTypes();
    }
  }, [types, dispatch]);

  useEffect(() => {
    if (languages && languages.size > 0) {
      const fetchLanguages = async () => {
        try {
          await Promise.all(
            Array.from(languages).map(async (tax) => {
              const result = await dispatch(getLanguage(tax));

              if (getLanguage.fulfilled.match(result)) {
                const taxonomy = result.payload as Taxonomy;
                taxLanguages.add(taxonomy);
              } else {
                console.error("Failed to fetch language:", result.error);
                return null;
              }
            })
          );
        } catch (error) {
          console.error("Error fetching project types:", error);
        }
      };

      fetchLanguages();
    }
  }, [languages, dispatch]);

  useEffect(() => {
    if (Array.isArray(frameworks) && frameworks.size > 0) {
      const fetchFrameworks = async () => {
        try {
          await Promise.all(
            Array.from(frameworks).map(async (tax) => {
              const result = await dispatch(getFramework(tax));
              if (getFramework.fulfilled.match(result)) {
                const taxonomy = result.payload as Taxonomy;
                taxFrameworks.add(taxonomy);
              } else {
                console.error("Failed to fetch language:", result.error);
                return null;
              }
            })
          );
        } catch (error) {
          console.error("Error fetching project types:", error);
        }
      };

      fetchFrameworks();
    }
  }, [frameworks, dispatch]);

  useEffect(() => {
    if (Array.isArray(technologies) && technologies.size > 0) {
      const fetchTechnologies = async () => {
        const techData = await Promise.all(
          Array.from(technologies).map(async (tax) => {
            const result = await dispatch(getTechnology(tax));
            if (getTechnology.fulfilled.match(result)) {
              const taxonomy = result.payload as Taxonomy;
              taxTechnologies.add(taxonomy);
            } else {
              console.error("Failed to fetch project type:", result.error);
              return null;
            }
          })
        );
      };

      fetchTechnologies();
    }
  }, [technologies, dispatch]);

  return (
    <>
      <div
        className="project-process-development"
        id="project_process_development">

        <h4 className="title">development</h4>

        <CheckList checkList={checkList} />

        <ContentComponent content={content} />

        {/* <Versions versions_list={development?.versionsList} /> */}

        {taxTypes.size > 0 && <TaxList taxonomies={taxTypes} title={'types'} />}

        {taxLanguages && taxLanguages.size > 0 && <TaxListIcon taxonomies={taxLanguages} title={'languages'} />}

        {taxFrameworks && taxFrameworks.size > 0 && <TaxListIcon taxonomies={taxFrameworks} title={'frameworks'} />}

        {taxTechnologies && taxTechnologies.size > 0 && <TaxListIcon taxonomies={taxTechnologies} title={'technologies'} />}
      </div>
    </>
  );
}

export default Development;
