import React from "react";

import ProjectStatus from "@/model/ProjectStatus";

interface ProjectStatusProps {
  projectStatus: ProjectStatus;
}

const Status: React.FC<ProjectStatusProps> = ({ projectStatus }) => {
  const { createdAt, updatedAt, progress } = projectStatus;

  return (
    <>
      {createdAt && updatedAt && progress && (
        <>
          <div className="project-status">
            <h4>STATUS</h4>

            <div className="status-details">
              <div className="row">
                <h5>Started:</h5>
                <h6>{createdAt}</h6>
              </div>
              <div className="row">
                <h5>Updated:</h5>
                <h6>{updatedAt}</h6>
              </div>
            </div>

            <progress value={progress} max="100"></progress>
            <h6>{progress}% Completed</h6>
          </div>
        </>
      )}
    </>
  );
}

export default Status;
