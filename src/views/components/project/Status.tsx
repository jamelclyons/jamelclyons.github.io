import React, { useEffect, useState } from "react";

import ProjectStatus from "@/model/ProjectStatus";
import ProjectProgress from "@/model/ProjectProgress";

interface ProjectStatusProps {
  projectStatus: ProjectStatus;
}

const Status: React.FC<ProjectStatusProps> = ({ projectStatus }) => {
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => { setUpdatedAt(projectStatus.updatedAt) }, [projectStatus, setUpdatedAt])

  useEffect(() => { setCreatedAt(projectStatus.createdAt) }, [projectStatus, setCreatedAt])

  useEffect(() => {
    if (typeof projectStatus.progress === 'number') {
      setProgress(projectStatus.progress)
    } else if (projectStatus.progress instanceof ProjectProgress) {
      setProgress(projectStatus.progress.completion)
    }
  }, [projectStatus, setProgress])

  return (
    <>
      <div className="project-status">
        <h3>STATUS</h3>

        <div className="status-details">
          {createdAt && <div className="row">
            <h4>Started:</h4>
            <h5>{createdAt}</h5>
          </div>}

          {updatedAt && <div className="row">
            <h4>Updated:</h4>
            <h5>{updatedAt}</h5>
          </div>}
        </div>

        {progress && progress > 0 &&
          <div className="status-progress">
            <progress value={progress} max="100"></progress>
            <h4>{progress.toFixed(1)}% Completed</h4>
          </div>}
      </div>
    </>
  );
}

export default Status;
