import React from "react";

import ProjectVersions from '@/model/ProjectVersions';

interface VersionsProps {
  projectVersions: ProjectVersions;
}

const Versions: React.FC<VersionsProps> = ({ projectVersions }) => {
console.log(projectVersions)
  return (
    <>
      {!projectVersions.isEmpty ? (
        <div className="versions">
          <span className="current-version">
            <h4>Current Version</h4>
            {projectVersions.current}
          </span>

          <span className="upcoming-versions">
            <h4>Upcoming Versions</h4>
            <table>
              <tbody>
                {/* {Array.isArray(projectVersions.previous) &&
                  projectVersions.previous.map((version, index) => (
                    <tr key={index}>
                      <td className="feature">{version.title}</td>
                      <td>-</td>
                      <td>{version.version}</td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </span>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Versions;
