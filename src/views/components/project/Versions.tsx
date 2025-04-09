import React from "react";

import ProjectVersions from '@/model/ProjectVersions';

interface VersionsProps {
  projectVersions: ProjectVersions;
}

const Versions: React.FC<VersionsProps> = ({ projectVersions }) => {
  return (
    <>
      {projectVersions && (projectVersions.current || projectVersions.history.size > 0) &&
        <div className="versions">
          {projectVersions.current &&
            <span className="current-version">
              <h4>Current Version</h4>
              {projectVersions.current}
            </span>}
        </div>
      }
    </>
  );
}

export default Versions;
