import React from 'react';

import Taxonomy from '../../model/Taxonomy';

import IconComponent from './IconComponent';

interface ProjectSkillsProp {
  skills: Array<Record<string,any>>;
}

const ProjectSkills: React.FC<ProjectSkillsProp> = ({ skills }) => {
  console.log(skills)
  return (
    <>
      {skills?.length > 0 && (
        <div className="project-skills-bar">
          {skills.map((skill, index) => (
            <div className="icon">
              <a href={`#/projects/${skill.path}/${skill.id}`}>
                <IconComponent key={index} image={skill.image} />
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectSkills;
