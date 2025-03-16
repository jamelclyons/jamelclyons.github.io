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
  const { skillsObject } = useSelector((state: RootState) => state.taxonomies);

  const [skills, setSkills] = useState<Skills>(new Skills())
  const [projectSkills, setProjectSkills] = useState<Set<Taxonomy>>(new Set());

  useEffect(() => {
    if (skillsObject) {
      setSkills(new Skills(skillsObject))
    }
  }, [skillsObject]);

  useEffect(() => {
    if (taxonomies.size > 0 && skills) {

      const { languages, frameworks, technologies } = skills;

      taxonomies.forEach(async (tax) => {
        if (tax.image.className === '' && tax.image.url === '') {

          if (languages.size > 0) {
            languages.forEach((language) => {
              if (language.id === tax.id) {
                projectSkills.add(language);
              }
            })
          }

          if (frameworks.size > 0) {
            frameworks.forEach((framework) => {
              if (framework.id === tax.id) {
                projectSkills.add(framework);
              }
            })
          }

          if (technologies.size > 0) {
            technologies.forEach((technology) => {
              if (technology.id === tax.id) {
                projectSkills.add(technology);
              }
            })
          }
        }

        if (tax.image.className || tax.image.url) {
          projectSkills.add(tax);
        }
      });
    }
  }, [taxonomies, setProjectSkills]);

  return (
    projectSkills && (
      <div className="tax-list">
        <h5 className="title">{title}</h5>

        <div className="tax-row">
          <ProjectSkillsBar skills={projectSkills} />
        </div>
      </div>
    )
  );
}

export default TaxListIcon;
