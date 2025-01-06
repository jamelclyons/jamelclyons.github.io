import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { marked } from 'marked';

import DescriptionComponent from '../DescriptionComponent';

import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';

import type { RootState, AppDispatch } from '../../../model/store';
import Project from '../../../model/Project';
import RepoContent from '../../../model/RepoContent';

import { fetchContent } from '../../../controllers/contentSlice';
import { dispatch } from '../../../model/hooks';
import { getTaxImages } from '../../../controllers/taxonomiesSlice';
import { lang } from 'moment';
import Taxonomy from '../../../model/Taxonomy';

const ProjectComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const project: Project = location.state;
  const {
    title, description, solution, process, problem, details
  } = project;

  const { contents, languagesObject } = useSelector(
    (state: RootState) => state.github
  );

  const [solutionContent, setSolutionContent] = useState<RepoContent | null>(null);
  const [designContent, setDesignContent] = useState<RepoContent | null>(null);
  const [developmentContent, setDevelopmentContent] = useState<RepoContent | null>(null);
  const [deliveryContent, setDeliveryContent] = useState<RepoContent | null>(null);
  const [problemContent, setProblemContent] = useState<RepoContent | null>(null);

  const [languages, setLanguages] = useState<Set<Taxonomy>>(new Set());

  useEffect(() => {
    if (Array.isArray(contents) && contents.length > 0) {
      contents.map((content) => {
        if (content.type === 'file') {
          if (content.name === 'TheSolution.md') {
            setSolutionContent(new RepoContent(content));
          }

          if (content.name === 'Design.md') {
            setDesignContent(new RepoContent(content));
          }

          if (content.name === 'Development.md') {
            setDevelopmentContent(new RepoContent(content));
          }

          if (content.name === 'Delivery.md') {
            setDeliveryContent(new RepoContent(content));
          }

          if (content.name === 'TheProblem.md') {
            setProblemContent(new RepoContent(content));
          }
        }
      });
    }
  }, [contents]);

  const loadMarkdown = async (url: string) => {
    try {
      return await fetchContent(url);
    } catch (error) {
      console.error("Error fetching markdown:", error);
    }
  };

  useEffect(() => {
    if (solutionContent) {
      loadMarkdown(solutionContent.downloadURL)
        .then((markdown) => {
          if (typeof markdown === 'string') {
            solution.content = marked(markdown).valueOf();
          }
        });
    }
  }, [contents, solutionContent]);

  useEffect(() => {
    if (designContent) {
      loadMarkdown(designContent.downloadURL)
        .then((markdown) => {
          if (typeof markdown === 'string') {
            process.design.content = marked(markdown).valueOf();
          }
        });
    }
  }, [contents, designContent]);

  useEffect(() => {
    if (developmentContent) {
      loadMarkdown(developmentContent.downloadURL)
        .then((markdown) => {
          if (typeof markdown === 'string') {
            process.development.content = marked(markdown).valueOf();
          }
        });
    }
  }, [contents, developmentContent]);

  useEffect(() => {
    if (deliveryContent) {
      loadMarkdown(deliveryContent.downloadURL)
        .then((markdown) => {
          if (typeof markdown === 'string') {
            process.delivery.content = marked(markdown).valueOf();
          }
        });
    }
  }, [contents, deliveryContent]);

  useEffect(() => {
    if (problemContent) {
      loadMarkdown(problemContent.downloadURL)
        .then((markdown) => {
          if (typeof markdown === 'string') {
            problem.content = marked(markdown).valueOf();
          }
        });
    }
  }, [contents, problemContent]);

  useEffect(() => {
    if (languagesObject.length > 0) {
      const updatedLanguages: Set<Taxonomy> = new Set();

      dispatch(getTaxImages({ type: 'languages', taxonomies: languagesObject })).unwrap().then((langs) => {
        langs.forEach((lang) => {
          let language = new Taxonomy(lang);
          updatedLanguages.add(language);
        });
      });

      setLanguages(updatedLanguages);
    }
  }, [dispatch, languagesObject]);

  return (
    <>
      <main className="project">
        {title !== '' && <h1 className="title">{title}</h1>}

        <DescriptionComponent description={description} />

        <TheSolution solution={solution} />

        <TheProcess process={process} />

        <TheProblem problem={problem} />

        {/* Project details is for clients only */}
        <Details details={details} />

        {/* {projectTypes.size > 0 && <TaxList taxonomies={projectTypes} title={'Project Types'} />} */}

        {languages.size > 0 && <TaxListIcon taxonomies={languages} title={'Languages'} />}

        {/* {frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />}

          {technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'Technologies'} />} */}
      </main>
    </>
  );
}

export default ProjectComponent;
