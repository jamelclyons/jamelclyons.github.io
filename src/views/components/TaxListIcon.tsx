import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/model/store';
import Taxonomy, { Framework, Language, ProjectType, Service, Technology } from '@/model/Taxonomy';
import Skills from '@/model/Skills';

import ProjectSkillsBar from './ProjectSkillsBar';

interface TaxListIconProps {
  taxonomiesTitle: string;
  taxonomiesSet: Set<ProjectType | Language | Framework | Technology | Service>;
}

const TaxListIcon: React.FC<TaxListIconProps> = ({ taxonomiesTitle, taxonomiesSet }) => {
  const { skillsObject } = useSelector((state: RootState) => state.taxonomies);

  const [title, setTitle] = useState<string>(taxonomiesTitle);
  const [skills, setSkills] = useState<Skills>(new Skills())
  const [projectSkills, setProjectSkills] = useState<Set<ProjectType | Language | Framework | Technology | Service>>(new Set());

  useEffect(() => {
    setTitle(taxonomiesTitle)
  }, [taxonomiesTitle, setTitle]);

  useEffect(() => {
    if (skillsObject) {
      setSkills(new Skills(skillsObject))
    }
  }, [skillsObject, setSkills]);

  useEffect(() => {
    if (taxonomiesSet.size > 0 && skills) {

      const { types, languages, frameworks, technologies } = skills;

      taxonomiesSet.forEach(async (tax) => {
        if (types.size > 0) {
          types.forEach((type) => {
            if (type.id === tax.id) {
              projectSkills.add(type);
            }
          })
        }

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
      });
    }
  }, [taxonomiesSet, setProjectSkills]);

  return (
    projectSkills && (
      <div className="tax-list">
        <h5 className="title">{title}</h5>

        <div className="tax-row">
          <ProjectSkillsBar skillsSet={projectSkills} />
        </div>
      </div>
    )
  );
}

export default TaxListIcon;
