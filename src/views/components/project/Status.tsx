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
            <h3>STATUS</h3>

            <div className="status-details">
              <div className="row">
                <h4>Started:</h4>
                <h5>{createdAt}</h5>
              </div>

              <div className="row">
                <h4>Updated:</h4>
                <h5>{updatedAt}</h5>
              </div>
            </div>

            <progress value={progress.completion} max="100"></progress>
            <h4>{progress.completion.toFixed(1)}% Completed</h4>
          </div>
        </>
      )}
    </>
  );
}

export default Status;
