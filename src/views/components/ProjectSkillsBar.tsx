import React from 'react';

import Taxonomy from '../../model/Taxonomy';

import IconComponent from './IconComponent';

interface ProjectSkillsProp {
  skills: Set<Taxonomy>;
}

const ProjectSkills: React.FC<ProjectSkillsProp> = ({ skills }) => {
  const handleClick = (skill: Taxonomy) => {
    handleSkills();
    window.location.href = `/#/projects/${skill.path}/${skill.id}`;
  };

  const handleSkills = () => {
    const skillsElement = document.getElementById('top');

    if (skillsElement) {
      skillsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {skills.size > 0 && (
        <div className="project-skills-bar">
          {Array.from(skills).map((skill, index) => (
            <div className="icon" key={index}>
              <button
                key={index}
                className="skills-button"
                onClick={() => handleClick(skill)}>
                <IconComponent image={skill.image} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectSkills;
