import React from "react";

import ProjectStatus from "../../model/ProjectStatus";

interface ProjectStatusProps {
  projectStatus: ProjectStatus;
}

const ProjectStatusComponent: React.FC<ProjectStatusProps> = ({ projectStatus }) => {
  const { createdAt, updatedAt, progress } = projectStatus;

  return (
    <>
      {createdAt && updatedAt && progress && (
        <>
          <div className="project-status">
            <h4>STATUS</h4>
            <h5>Started: {createdAt}</h5>
            <h5>Updated: {updatedAt}</h5>
            <progress value={progress} max="100"></progress>
            <h6>{progress}% Completed</h6>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectStatusComponent;
