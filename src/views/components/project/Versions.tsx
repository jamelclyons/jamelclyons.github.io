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

          {projectVersions.history.size > 0 && <span className="upcoming-versions">
            <h4>Upcoming Versions</h4>
            <table>
              <tbody>
                {Array.isArray(projectVersions.history) &&
                  projectVersions.history.map((version, index) => (
                    <tr key={index}>
                      <td className="feature">{version.title}</td>
                      <td>-</td>
                      <td>{version.version}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </span>}
        </div>
      }
    </>
  );
}

export default Versions;
