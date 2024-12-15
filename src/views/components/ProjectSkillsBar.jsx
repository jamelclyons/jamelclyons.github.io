import React, { useEffect, useRef } from 'react';

import IconComponent from './IconComponent';

function ProjectSkills(props) {
  const { skills } = props;

  return (
    <>
      {Array.isArray(skills) && skills.length > 0 && (
        <div className="project-skills-bar">
          {skills.map((skill, index) => (
            <IconComponent key={index} icon={skill} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectSkills;
