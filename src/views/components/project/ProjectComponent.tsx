import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../../model/store';

import Gallery from '../Gallery';
import ProjectDescription from '../portfolio/ProjectDescription';
import Details from './Details';
import TheSolution from './TheSolution';
import ProjectURLs from './ProjectURLsComponent';
import TheProblem from './TheProblem';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';
import ProjectTeam from './ProjectTeam'
import TheProcess from './TheProcess';

import {
  getProjectType,
  getLanguage,
  getFramework,
  getTechnology,
} from '../../../controllers/taxonomiesSlice';

import Project from '../../../model/Project';
import Taxonomy from '../../../model/Taxonomy';

interface ProjectProps {
  project: Project | null
}

const ProjectComponent: React.FC<ProjectProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  let types: Set<Taxonomy> = new Set();
  let languages: Set<Taxonomy> = new Set();
  let frameworks: Set<Taxonomy> = new Set();
  let technologies: Set<Taxonomy> = new Set();

  useEffect(() => {
    if (project?.process?.development?.types && project.process.development.types.size > 0) {
      const fetchProjectTypes = async () => {
        try {
          await Promise.all(
            Array.from(project.process.development.types).map(async (tax: string) => {
              const result = await dispatch(getProjectType(tax));
              if (getProjectType.fulfilled.match(result)) {
                const taxonomy = result.payload as Taxonomy;
                types.add(taxonomy);
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
  }, [project?.process?.development?.types, dispatch]);

  useEffect(() => {
    if (project?.process?.development?.languages && project.process.development.languages.size > 0) {
      const fetchLanguages = async () => {
        try {
          await Promise.all(
            Array.from(project.process.development.languages).map(async (tax) => {
              const result = await dispatch(getLanguage(tax));
              if (getLanguage.fulfilled.match(result)) {
                const taxonomy = result.payload as Taxonomy;
                languages.add(taxonomy);
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
  }, [project?.process?.development?.languages, dispatch]);

  useEffect(() => {
    if (Array.isArray(project?.process?.development?.frameworks) && project.process.development.frameworks.size > 0) {
      const fetchFrameworks = async () => {
        try {
          await Promise.all(
            Array.from(project.process.development.frameworks).map(async (tax) => {
              const result = await dispatch(getFramework(tax));
              if (getFramework.fulfilled.match(result)) {
                const taxonomy = result.payload as Taxonomy;
                frameworks.add(taxonomy);
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
  }, [project?.process?.development?.frameworks, dispatch]);

  useEffect(() => {
    if (Array.isArray(project?.process?.development?.technologies) && project.process.development.technologies.size > 0) {
      const fetchTechnologies = async () => {
        const techData = await Promise.all(
          Array.from(project.process.development.technologies).map(async (tax) => {
            const result = await dispatch(getTechnology(tax));
            if (getTechnology.fulfilled.match(result)) {
              const taxonomy = result.payload as Taxonomy;
              technologies.add(taxonomy);
            } else {
              console.error("Failed to fetch project type:", result.error);
              return null;
            }
          })
        );
      };

      fetchTechnologies();
    }
  }, [project?.process?.development?.technologies, dispatch]);

  return (
    <>
      <main className="project">
        {project?.title && <h1 className="title">{project.title}</h1>}

        <ProjectDescription description={project?.description ?? 'No desription provided.'} />

        {/* <ProjectURLs projectUrls={project?.solution?.urlsList} /> */}

        {project?.solution && <TheSolution solution={project.solution} />}

        {project?.process && <TheProcess process={project.process} />}

        {project?.problem && <TheProblem problem={project?.problem} />}

        {types && types.size > 0 && <TaxList taxonomies={types} title={'types'} />}

        {languages && languages.size > 0 && <TaxListIcon taxonomies={languages} title={'languages'} />}

        {frameworks && frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'frameworks'} />}

        {technologies && technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'technologies'} />}

        {/* Project details is for clients only */}
        {project?.details && <Details project_details={project.details} />}
      </main>
    </>
  );
}

export default ProjectComponent;
