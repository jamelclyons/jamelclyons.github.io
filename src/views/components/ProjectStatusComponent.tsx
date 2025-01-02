import React from "react";

import ProjectStatus from "../../model/ProjectStatus";

interface ProjectStatusProps {
  projectStatus: ProjectStatus;
}

const ProjectStatusComponent: React.FC<ProjectStatusProps> = ({ projectStatus }) => {

  return (
    <>
      {projectStatus && (
        <>
          <div className="project-status">
            <h4>STATUS</h4>
            <h5>Started: {projectStatus.createdAt}</h5>
            <h5>Updated: {projectStatus.updatedAt}</h5>
            <progress value={projectStatus.progress} max="100"></progress>
            <p>{projectStatus.progress}% Completed</p>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectStatusComponent;
