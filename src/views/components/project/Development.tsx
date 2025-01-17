import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectDevelopment from '../../../model/ProjectDevelopment';
import Image from '@/model/Image';
import Skills from '@/model/Skills';

import CheckList from './CheckList';
import ContentComponent from '../content/ContentComponent';
import ProjectURLs from './ProjectURLsComponent';
import Versions from './Versions';
import ImageComponent from '../ImageComponent';
import SkillsComponent from '../SkillsComponent';
import Taxonomy from '@/model/Taxonomy';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkList, content, repoURL, versionsList } = development;

  const { skillsObject } = useSelector((state: RootState) => state.portfolio);

  const [gitHub, setGitHub] = useState<Image>(new Image());
  const [skills, setSkills] = useState<Skills>(new Skills());

  useEffect(() => {
    if (skillsObject &&
      (development.skills.types.size > 0 ||
        development.skills.languages.size > 0 ||
        development.skills.frameworks.size > 0 ||
        development.skills.technologies.size > 0
      )) {
      let imageTypes: Set<Taxonomy> = new Set();
      let imageLanguages: Set<Taxonomy> = new Set();
      let imageFrameworks: Set<Taxonomy> = new Set();
      let imageTechnologies: Set<Taxonomy> = new Set();

      const skillsType = new Skills(skillsObject);

      if (development.skills.types.size > 0) {
        skillsType.types.forEach((skill: Record<string, any>) => {
          Array.from(development.skills.types).forEach((type) => {
            if (skill.id === type.id) {
              type.setClassName(skill.className);
              type.setIconURL(skill.iconURL);
              imageTypes.add(type);
            }
          });
        });
      }

      if (development.skills.languages.size > 0) {
        skillsType.languages.forEach((skill: Record<string, any>) => {
          Array.from(development.skills.languages).forEach((language) => {
            if (skill.id === language.id) {
              language.setClassName(skill.className);
              language.setIconURL(skill.iconURL);
              console.log(language)
              imageLanguages.add(language);
            }
          });
        });
      }

      if (development.skills.frameworks.size > 0) {
        skillsType.frameworks.forEach((skill: Record<string, any>) => {
          Array.from(development.skills.frameworks).forEach((framework) => {
            if (skill.id === framework.id) {
              framework.setClassName(skill.className);
              framework.setIconURL(skill.iconURL);
              imageFrameworks.add(framework);
            }
          });
        });
      }

      if (development.skills.technologies.size > 0) {
        skillsType.technologies.forEach((skill: Record<string, any>) => {
          Array.from(development.skills.technologies).forEach((technology) => {
            if (skill.id === technology.id) {
              technology.setClassName(skill.className);
              technology.setIconURL(skill.iconURL);
              imageTechnologies.add(technology);
            }
          });
        });
      }

      const updatedSkills = new Skills();
      updatedSkills.types = imageTypes;
      updatedSkills.languages = imageLanguages;
      updatedSkills.frameworks = imageFrameworks;
      updatedSkills.technologies = imageTechnologies;

      setSkills(updatedSkills);
    }
  }, []);

  useEffect(() => {
    if (repoURL) {
      try {
        setGitHub(new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' }));
      } catch (error) {
        const err = error as Error;
        console.error('Invalid URL format:', err.message);
      }
    }
  }, [repoURL, dispatch]);

  const handleSeeCode = () => {
    window.open(repoURL, '_blank');
  };

  return (
    <>{(
      skills ||
      checkList.length > 0 ||
      (typeof content === 'string' && content !== '') ||
      (versionsList?.current !== '' && versionsList?.previous.length > 0) ||
      repoURL !== '') &&
      <div className="project-process-development" id="project_process_development">

        <h4 className="title">development</h4>

        {skills && <SkillsComponent skills={skills} />}

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
