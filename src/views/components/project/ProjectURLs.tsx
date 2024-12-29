import React from "react";

import ProjectUrl from "../../../model/ProjectUrl";
import IconComponent from "../IconComponent";

interface ProjectURLsProps {
  projectUrls: Array<ProjectUrl>;
}

const ProjectURLs: React.FC<ProjectURLsProps> = ({ projectUrls }) => {

  return (
    <>
      {Array.isArray(projectUrls) && projectUrls.length > 0 ? (
        <div className="project-urls">
          {projectUrls.map((projectUrl, index) => (
            <button
              key={index}
              onClick={() => window.open(projectUrl.url, '_blank')}>
              <IconComponent image={projectUrl.image} />
              <h3>{`${projectUrl.name}`}</h3>
            </button>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ProjectURLs;
