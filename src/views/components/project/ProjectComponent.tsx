import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../../model/store';

import Gallery from '../Gallery.js';
import ProjectDescription from '../portfolio/ProjectDescription.js';
import Details from './Details.jsx';
import TheSolution from './TheSolution.tsx';
import ProjectURLs from './ProjectURLs.jsx';
import TheProblem from './TheProblem.tsx';
import TaxList from '../TaxList.js';
import TaxListIcon from '../TaxListIcon.jsx';
import ProjectTeam from './ProjectTeam.jsx';
import TheProcess from './TheProcess.tsx';

import {
  getProjectType,
  getLanguage,
  getFramework,
  getTechnology,
} from '../../../controllers/taxonomiesSlice.js';

import Project from '../../../model/Project.ts';
import Taxonomy from '../../../model/Taxonomy.ts';

interface ProjectProps {
  project: Project | null
}

const ProjectComponent: React.FC<ProjectProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [types, setTypes] = useState<Array<Taxonomy> | null>(null);
  const [languages, setLanguages] = useState<Array<Taxonomy> | null>(null);
  const [frameworks, setFrameworks] = useState<Array<Taxonomy> | null>(null);
  const [technologies, setTechnologies] = useState<Array<Taxonomy> | null>(null);

  useEffect(() => {
    if (Array.isArray(project?.types)) {
      const fetchProjectTypes = async () => {
        try {
          const projectTypeData = await Promise.all(
            project.types.map(async (tax: string) => {
              const result = await dispatch(getProjectType(tax));
              if (getProjectType.fulfilled.match(result)) {
                return result.payload as Taxonomy;
              } else {
                console.error("Failed to fetch project type:", result.error);
                return null;
              }
            })
          );

          setTypes(projectTypeData.filter((type): type is Taxonomy => type !== null));
        } catch (error) {
          console.error("Error fetching project types:", error);
        }
      };

      fetchProjectTypes();
    }
  }, [project?.types, dispatch]);

  useEffect(() => {
    if (Array.isArray(project?.languages)) {
      const fetchLanguages = async () => {
        try {
          const languageData = await Promise.all(
            project.languages.map(async (tax) => {
              const result = await dispatch(getLanguage(tax));
              if (getLanguage.fulfilled.match(result)) {
                return result.payload as Taxonomy;
              } else {
                console.error("Failed to fetch language:", result.error);
                return null;
              }
            })
          );

          setLanguages(languageData.filter((type): type is Taxonomy => type !== null));
        } catch (error) {
          console.error("Error fetching project types:", error);
        }
      };

      fetchLanguages();
    }
  }, [project?.languages, dispatch]);

  useEffect(() => {
    if (Array.isArray(project?.frameworks)) {
      const fetchFrameworks = async () => {
        try {
          const frameworkData = await Promise.all(
            project.frameworks.map(async (tax) => {
              const result = await dispatch(getFramework(tax));
              if (getFramework.fulfilled.match(result)) {
                return result.payload as Taxonomy;
              } else {
                console.error("Failed to fetch language:", result.error);
                return null;
              }
            })
          );

          setFrameworks(frameworkData.filter((type): type is Taxonomy => type !== null));
        } catch (error) {
          console.error("Error fetching project types:", error);
        }
      };

      fetchFrameworks();
    }
  }, [project?.frameworks, dispatch]);

  useEffect(() => {
    if (Array.isArray(project?.technologies)) {
      const fetchTechnologies = async () => {
        const techData = await Promise.all(
          project.technologies.map(async (tax) => {
            const result = await dispatch(getTechnology(tax));

            if (getTechnology.fulfilled.match(result)) {
              return result.payload as Taxonomy;
            } else {
              console.error("Failed to fetch project type:", result.error);
              return null;
            }
          })
        );

        setTechnologies(techData.filter((type): type is Taxonomy => type !== null));
      };

      fetchTechnologies();
    }
  }, [project?.technologies, dispatch]);

  return (
    <>
      <main className="project">
        {project?.title && <h1 className="title">{project.title}</h1>}

        <ProjectDescription description={project?.description} />

        <ProjectURLs project_urls={project?.urlsList} />

        {project?.solution && <TheSolution solution={project.solution} />}

        {project?.process && <TheProcess process={project.process} />}

        {project?.problem && <TheProblem problem={project?.problem} />}

        <TaxList tax={types} title={'types'} />

        <TaxListIcon tax={languages} title={'languages'} />

        <TaxListIcon tax={frameworks} title={'frameworks'} />

        <TaxListIcon tax={technologies} title={'technologies'} />

        {/* Project details is for clients only */}
        {project?.details && <Details project_details={project.details} />}
      </main>
    </>
  );
}

export default ProjectComponent;
