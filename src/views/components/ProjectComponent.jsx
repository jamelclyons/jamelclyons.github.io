import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Gallery from './Gallery';
import ProjectDescription from './ProjectDescription';
import ProjectDetails from './ProjectDetails';
import TheSolution from './TheSolution';
import ProjectURLs from './ProjectURLs';
import TheProblem from './TheProblem';
import TaxList from './TaxList';
import TaxListIcon from './TaxListIcon';
import ProjectTeam from './ProjectTeam';
import TheProcess from './TheProcess';

import {
  getProjectType,
  getLanguage,
  getFramework,
  getTechnology,
} from '../../controllers/taxonomiesSlice';

function ProjectComponent(props) {
  const dispatch = useDispatch();

  const {
    title,
    description,
    features,
    currency,
    price,
    solution_gallery,
    project_urls,
    project_details,
    the_solution,
    the_problem,
    project_team,
    projectTypesProp,
    languagesProp,
    frameworksProp,
    technologiesProp,
  } = props;

  const [project_types, setProjectTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    if (Array.isArray(projectTypesProp)) {
      const fetchProjectTypes = async () => {
        const projectTypeData = await Promise.all(
          projectTypesProp.map(async (tax) => {
            const projectType = await dispatch(getProjectType(tax));
            return projectType.payload;
          })
        );

        setProjectTypes(projectTypeData);
      };

      fetchProjectTypes();
    }
  }, [projectTypesProp, dispatch]);

  useEffect(() => {
    if (Array.isArray(languagesProp)) {
      const fetchLanguages = async () => {
        const languageData = await Promise.all(
          languagesProp.map(async (tax) => {
            const language = await dispatch(getLanguage(tax));
            return language.payload;
          })
        );

        setLanguages(languageData);
      };

      fetchLanguages();
    }
  }, [languagesProp, dispatch]);

  useEffect(() => {
    if (Array.isArray(frameworksProp)) {
      const fetchFrameworks = async () => {
        const frameworkData = await Promise.all(
          frameworksProp.map(async (tax) => {
            const framework = await dispatch(getFramework(tax));
            return framework.payload;
          })
        );

        setFrameworks(frameworkData);
      };

      fetchFrameworks();
    }
  }, [frameworksProp, dispatch]);

  useEffect(() => {
    if (Array.isArray(technologiesProp)) {
      const fetchTechnologies = async () => {
        const techData = await Promise.all(
          technologiesProp.map(async (tech) => {
            const technology = await dispatch(getTechnology(tech));
            return technology.payload;
          })
        );

        setTechnologies(techData);
      };

      fetchTechnologies();
    }
  }, [technologiesProp, dispatch]);

  return (
    <>
      <main className="project">
        {title && <h1 class="title">{title}</h1>}

        <Gallery gallery={solution_gallery} />

        <ProjectDescription description={description} />

        <TheSolution
          features={features}
          currency={currency}
          price={price}
          the_solution={the_solution}
        />

        <ProjectURLs project_urls={project_urls} />

        {/* Project details is for clients only */}
        <ProjectDetails project_details={project_details} />

        <TheProcess />

        <TheProblem the_problem={the_problem} />

        <TaxList tax={project_types} title={'project types'} />

        <TaxListIcon tax={languages} title={'languages'} />

        <TaxListIcon tax={frameworks} title={'frameworks'} />

        <TaxListIcon tax={technologies} title={'technologies'} />

        <ProjectTeam project_team={project_team} />
      </main>
    </>
  );
}

export default ProjectComponent;
