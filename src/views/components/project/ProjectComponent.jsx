import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Gallery from '../Gallery';
import ProjectDescription from '../portfolio/ProjectDescription';
import Details from './Details';
import TheSolution from './TheSolution';
import ProjectURLs from './ProjectURLs';
import TheProblem from './TheProblem';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';
import ProjectTeam from './ProjectTeam';
import TheProcess from './TheProcess';

import {
  getProjectType,
  getLanguage,
  getFramework,
  getTechnology,
} from '../../../controllers/taxonomiesSlice';

function ProjectComponent(props) {
  const dispatch = useDispatch();

  const { project } = props;

  const [types, setTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    if (Array.isArray(project.types)) {
      const fetchProjectTypes = async () => {
        const projectTypeData = await Promise.all(
          project.types.map(async (tax) => {
            const projectType = await dispatch(getProjectType(tax));
            return projectType.payload;
          })
        );

        setTypes(projectTypeData);
      };

      fetchProjectTypes();
    }
  }, [project.types, dispatch]);

  useEffect(() => {
    if (Array.isArray(project.languages)) {
      const fetchLanguages = async () => {
        const languageData = await Promise.all(
          project.languages.map(async (tax) => {
            const language = await dispatch(getLanguage(tax));
            return language.payload;
          })
        );

        setLanguages(languageData);
      };

      fetchLanguages();
    }
  }, [project.languages, dispatch]);

  useEffect(() => {
    if (Array.isArray(project.frameworks)) {
      const fetchFrameworks = async () => {
        const frameworkData = await Promise.all(
          project.frameworks.map(async (tax) => {
            const framework = await dispatch(getFramework(tax));
            return framework.payload;
          })
        );

        setFrameworks(frameworkData);
      };

      fetchFrameworks();
    }
  }, [project.frameworks, dispatch]);

  useEffect(() => {
    if (Array.isArray(project.technologies)) {
      const fetchTechnologies = async () => {
        const techData = await Promise.all(
          project.technologies.map(async (tech) => {
            const technology = await dispatch(getTechnology(tech));
            return technology.payload;
          })
        );

        setTechnologies(techData);
      };

      fetchTechnologies();
    }
  }, [project.technologies, dispatch]);

  return (
    <>
      <main className="project">
        {project.title && <h1 class="title">{project.title}</h1>}

        <ProjectDescription description={project.description} />

        <ProjectURLs project_urls={project.urlsList} />

        <TheSolution solution={project.solution} />

        <TheProcess process={project.process} />

        <TheProblem problem={project.problem} />

        <TaxList tax={types} title={'types'} />

        <TaxListIcon tax={languages} title={'languages'} />

        <TaxListIcon tax={frameworks} title={'frameworks'} />

        <TaxListIcon tax={technologies} title={'technologies'} />

        {/* Project details is for clients only */}
        <Details project_details={project.detailsList} />
      </main>
    </>
  );
}

export default ProjectComponent;
