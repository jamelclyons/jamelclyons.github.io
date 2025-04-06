import React, { useEffect, useState } from "react";

import ProjectProgress from "@/model/ProjectProgress";
import Project from "@/model/Project";

interface ProjectStatusProps {
  project: Project;
}

const Status: React.FC<ProjectStatusProps> = ({ project }) => {
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => { setUpdatedAt(project.process?.status?.updatedAt ?? null) }, [project])

  useEffect(() => { setCreatedAt(project.process?.status?.createdAt ?? null) }, [project])

  useEffect(() => {
    if (typeof project.process?.status?.progress === 'number') {
      setProgress(project.process?.status?.progress)
    } else if (project.process?.status?.progress instanceof ProjectProgress) {
      setProgress(project.process?.status?.progress.completion)
    }
  }, [project])

  const hasContent = createdAt || updatedAt || progress;
  return (
    <>
      {hasContent &&
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
        </div>}
    </>
  );
}

export default Status;
