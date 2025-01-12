import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../../model/store';
import ProjectDevelopment from '../../../model/ProjectDevelopment';
import Taxonomy from '../../../model/Taxonomy';
import Image from '@/model/Image';

import CheckList from './CheckList';
import ContentComponent from '../content/ContentComponent';
import ProjectURLs from './ProjectURLsComponent';
import Versions from './Versions';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';
import ImageComponent from '../ImageComponent';

import {
  getProjectType,
  getFramework,
  getTechnology,
} from '../../../controllers/taxonomiesSlice';
import { getTaxImages } from '../../../controllers/taxonomiesSlice';
import { getRepoLanguages } from '../../../controllers/githubSlice';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkList, content, repoURL, versionsList } = development;

  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [types, setTypes] = useState<Set<Taxonomy>>(new Set());
  const [languagesObject, setLanguagesObject] = useState<Array<Record<string, any>>>();
  const [technologiesObject, setTechnologiesObject] = useState<Array<Record<string, any>>>();
  const [languages, setLanguages] = useState<Set<Taxonomy>>(new Set());
  const [frameworks, setFrameworks] = useState<Set<Taxonomy>>(new Set());
  const [technologies, setTechnologies] = useState<Set<Taxonomy>>(new Set());
  const [gitHub, setGitHub] = useState<Image>(new Image());

  useEffect(() => {
    if (repoURL) {
      try {
        const repoUrl = new URL(repoURL);
        const pathname = repoUrl.pathname;
        const parts = pathname.split('/').filter(Boolean);

        setOwner(parts[0]);
        setRepo(parts[1]);
      } catch (error) {
        const err = error as Error;
        console.error('Invalid URL format:', err.message);
      }
    }
  }, [repoURL, dispatch]);

  useEffect(() => {
    if (repoURL) {
      try {
       setGitHub(new Image({title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw'}));
      } catch (error) {
        const err = error as Error;
        console.error('Invalid URL format:', err.message);
      }
    }
  }, [repoURL, dispatch]);

  useEffect(() => {
    if (owner && repo) {
      dispatch(getRepoLanguages({
        owner: owner,
        repo: repo,
        path: ''
      })).unwrap().then((contents) => {
        setLanguagesObject(contents.languages)
        setTechnologiesObject(contents.technologies)

      });
    }
  }, [owner, repo, dispatch]);

  useEffect(() => {
    if (development.types.size > 0) {
      let taxTypes: Set<Taxonomy> = new Set();

      const fetchProjectTypes = async () => {
        try {
          await Promise.all(
            Array.from(development.types).map(async (tax) => {
              const result = await dispatch(getProjectType(tax));

              if (getProjectType.fulfilled.match(result)) {
                const taxonomy = result.payload as Record<string, any>;
                taxTypes.add(new Taxonomy(taxonomy));
              } else {
                console.error("Failed to fetch project type:", result.error);
                return null;
              }
            })
          );

          setTypes(taxTypes);
        } catch (error) {
          console.error("Error fetching project types:", error);
        }
      };

      fetchProjectTypes();
    }
  }, [development, dispatch, setTypes]);

  useEffect(() => {
    if (languagesObject && languagesObject.length > 0) {
      const updatedLanguages: Set<Taxonomy> = new Set();

      dispatch(getTaxImages({ type: 'languages', taxonomies: languagesObject })).unwrap().then((langs) => {
        langs.forEach((lang) => {
          let language = new Taxonomy(lang);
          updatedLanguages.add(language);
        });
      });

      setLanguages(updatedLanguages);
    }
  }, [dispatch, languagesObject, setLanguages]);

  useEffect(() => {
    if (development && development.frameworks.size > 0) {
      const fetchFrameworks = async (): Promise<Array<Record<string, any>>> => {
        try {
          const taxFrameworks: Array<Record<string, any>> = [];

          await Promise.all(
            Array.from(development.frameworks).map(async (tax) => {
              const result = await dispatch(getFramework(tax));
              if (getFramework.fulfilled.match(result)) {
                const taxonomy = result.payload as Record<string, any>;
                taxFrameworks.push(taxonomy);
              } else {
                console.error("Failed to fetch framework:", result.error);
              }
            })
          );

          return taxFrameworks;
        } catch (error) {
          console.error("Error fetching frameworks:", error);
          return []; // Ensure a valid fallback return
        }
      };

      const processFrameworks = async () => {
        const taxFrameworks = await fetchFrameworks();

        if (taxFrameworks.length > 0) {
          try {
            const frameworks = await dispatch(
              getTaxImages({ type: "frameworks", taxonomies: taxFrameworks })
            ).unwrap();

            const updatedFrameworks: Set<Taxonomy> = new Set(
              frameworks.map((tax) => new Taxonomy(tax))
            );

            setFrameworks(updatedFrameworks);
          } catch (error) {
            console.error("Error fetching tax images:", error);
          }
        }
      };

      processFrameworks();
    }
  }, [development, dispatch, setFrameworks]);

  useEffect(() => {
    if (development && development.technologies.size > 0) {
      const fetchTechnologies = async (): Promise<Array<Record<string, any>>> => {
        try {
          const taxTechnologies: Array<Record<string, any>> = [];

          await Promise.all(
            Array.from(development.technologies).map(async (tax) => {
              const result = await dispatch(getTechnology(tax));
              if (getTechnology.fulfilled.match(result)) {
                const taxonomy = result.payload as Record<string, any>;
                taxTechnologies.push(taxonomy);
              } else {
                console.error("Failed to fetch project type:", result.error);
              }
            })
          );

          return taxTechnologies;
        } catch (error) {
          console.error("Error fetching project types:", error);
          return [];
        }
      };
console.log(technologiesObject);
      const processTechnologies = async () => {
        const taxTechnologies = await fetchTechnologies();

        if (taxTechnologies.length > 0) {
          try {
            const technologies = await dispatch(getTaxImages({ type: 'technologies', taxonomies: taxTechnologies })).unwrap();

            const updatedTechnologies: Set<Taxonomy> = new Set(
              technologies.map((tax) => new Taxonomy(tax))
            );

            setTechnologies(updatedTechnologies);
          } catch (error) {
            console.error("Error fetching tax images:", error);
          }
        }
      };

      processTechnologies();
    }
  }, [development, dispatch, setTechnologies]);

  const handleSeeCode = () => {
    window.open(repoURL, '_blank');
  };

  return (
    <>{(
      types.size > 0 || languages.size > 0 || frameworks.size > 0 || technologies.size > 0 ||
      checkList.length > 0 ||
      (typeof content === 'string' && content !== '') ||
      (versionsList?.current !== '' && versionsList?.previous.length > 0) ||
      repoURL !== '') &&
      <div className="project-process-development" id="project_process_development">

        <h4 className="title">development</h4>

        {types.size > 0 && <TaxList taxonomies={types} title={'types'} />}

        {languages.size > 0 && <TaxListIcon taxonomies={languages} title={'Languages'} />}

        {frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'frameworks'} />}

        {technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'technologies'} />}

        {checkList.length > 0 && <CheckList checkList={checkList} />}

        {typeof content === 'string' && content !== '' && <ContentComponent html={content} />}

        {/* <Versions versions_list={development?.versionsList} /> */}

        {repoURL !== '' &&
          <button className='repo' onClick={handleSeeCode}>
            <h3 className='title'>
              <ImageComponent image={gitHub} />
              See Code</h3>
          </button>}
      </div>
    }</>
  );
}

export default Development;
