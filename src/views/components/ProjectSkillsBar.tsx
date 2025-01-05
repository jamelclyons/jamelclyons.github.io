import React from 'react';

import Taxonomy from '../../model/Taxonomy';

import IconComponent from './IconComponent';

interface ProjectSkillsProp {
  skills: Set<Taxonomy>;
}

const ProjectSkills: React.FC<ProjectSkillsProp> = ({ skills }) => {

  return (
    <>
      {skills?.size > 0 && (
        <div className="project-skills-bar">
          {Array.from(skills).map((skill, index) => (
            <div className="icon" key={index}>
              <a href={`#/projects/${skill.path}/${skill.id}`}>
                <IconComponent image={skill.image} />
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectSkills;
