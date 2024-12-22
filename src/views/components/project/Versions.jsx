import { useSelector } from 'react-redux';

function Versions() {
  const { project_versions } = useSelector((state) => state.portfolio);

  return (
    <>
      {project_versions ? (
        <div className="versions">
          <span className="current-version">
            <h4>Current Version</h4>
            {project_versions.current_version}
          </span>

          <span className="upcoming-versions">
            <h4>Upcoming Versions</h4>
            <table>
              <tbody>
                {Array.isArray(project_versions[0]) &&
                  project_versions[0].map((version, index) => (
                    <tr key={index}>
                      <td className="feature">{version.title}</td>
                      <td>-</td>
                      <td>{version.version}</td>
                    </tr>
                  ))}
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
