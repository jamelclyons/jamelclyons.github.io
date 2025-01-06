import React, { Component, lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '../../../model/store';
import { useAppSelector } from '../../../model/hooks';

import CheckList from './CheckList';
import ContentComponent from '../content/ContentComponent';
import ProjectURLs from './ProjectURLsComponent';
import Versions from './Versions';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';

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

  const { checkList, content, repoURL, types, frameworks, technologies } = development;

  const { languages } = useSelector(
    (state: RootState) => state.github
  );

  // useEffect(() => {
  //   if (repoURL) {
  //     try {
  //       const repoUrl = new URL(repoURL);
  //       const pathname = repoUrl.pathname;
  //       const parts = pathname.split('/').filter(Boolean);

  //       if (parts.length >= 2) {
  //         const query: RepoQuery = {
  //           owner: parts[0],
  //           repo: parts[1]
  //         };

  //         dispatch(getRepo(query));
  //       } else {
  //         console.error('Invalid repository URL');
  //       }
  //     } catch (error) {
  //       const err = error as Error;
  //       console.error('Invalid URL format:', err.message);
  //     }
  //   }
  // }, [development, dispatch]);

  let taxTypes: Set<Taxonomy> = new Set();
  let taxLanguages: Array<Record<string,any>> = [];
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
    if (languages && languages.length > 0) {
      const fetchLanguages = async () => {
        try {
          return await Promise.all(
            Array.from(languages).map(async (tax) => {
              const result = await dispatch(getLanguage(tax.id));
              if (getLanguage.fulfilled.match(result)) {
                const taxonomy = new Taxonomy(result.payload);
                taxLanguages.push(taxonomy);
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

  const handleSeeCode = () => {
    window.open(repoURL, '_blank');
  };

  return (
    <>
        <div
          className="project-process-development"
          id="project_process_development">

          <h4 className="title">development</h4>

          {taxTypes.size > 0 && <TaxList taxonomies={taxTypes} title={'types'} />}

         <TaxListIcon taxonomies={taxLanguages} title={'languages'} />

          {/* {taxFrameworks.size > 0 && <TaxListIcon taxonomies={taxFrameworks} title={'frameworks'} />}

          {taxTechnologies.size > 0 && <TaxListIcon taxonomies={taxTechnologies} title={'technologies'} />} */}

          {checkList.length > 0 && <CheckList checkList={checkList} />}

          {content.length > 0 && <ContentComponent content={content} />}

          {/* <Versions versions_list={development?.versionsList} /> */}

          {repoURL !== '' &&
            <button onClick={handleSeeCode}>
              <h3 className='title'>See Code</h3>
            </button>}
        </div>
    </>
  );
}

export default Development;
