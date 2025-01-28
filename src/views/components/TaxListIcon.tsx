import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/model/store';
import Taxonomy from '@/model/Taxonomy';
import Skills from '@/model/Skills';

import ProjectSkillsBar from './ProjectSkillsBar';

interface TaxListIconProps {
  title: string;
  taxonomies: Set<Taxonomy>;
}

const TaxListIcon: React.FC<TaxListIconProps> = ({ title, taxonomies }) => {
  const { skillsObject } = useSelector((state: RootState) => state.portfolio);

  const [skills, setSkills] = useState<Skills>()
  const [projectSkills, setprojectSkills] = useState<Set<Taxonomy>>();

  useEffect(() => {
    if (skillsObject) {
      setSkills(new Skills(skillsObject))
    }
  }, [skillsObject]);

  useEffect(() => {
    if (taxonomies.size > 0 && skills) {
      let taxonomiesList: Set<Taxonomy> = new Set();

      const { languages, frameworks, technologies } = skills;

      taxonomies.forEach(async (tax) => {
        if (tax.className === '' && tax.iconURL === '') {
          if (languages.size > 0) {
            languages.forEach((language) => {
              if (language.id === tax.id) {
                taxonomiesList.add(language);
              }
            })
          }

          if (frameworks.size > 0) {
            frameworks.forEach((framework) => {
              if (framework.id === tax.id) {
                taxonomiesList.add(framework);
              }
            })
          }

          if (technologies.size > 0) {
            technologies.forEach((technology) => {
              if (technology.id === tax.id) {
                taxonomiesList.add(technology);
              }
            })
          }
        }
        
        if (tax.image.className || tax.image.url) {
          taxonomiesList.add(tax);
        }
      });

      setprojectSkills(taxonomiesList);
    }
  }, [skills, taxonomies]);


  return (
    projectSkills && (
      <div className="tax-list">
        <h6 className="title">{title}</h6>

        <div className="tax-row">
          <ProjectSkillsBar skills={projectSkills} />
        </div>
      </div>
    )
  );
}

export default TaxListIcon;
