function ProjectDetails(props) {
  const { project_details } = props;

  return (
    <>
      {project_details ? (
        <div className="project-details">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="client_name">Client Name:</label>
                </td>
                <td>
                  <h4 className="company-name">
                    {project_details.client_name}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="start_date">Start Date:</label>
                </td>
                <td>{project_details.start_date}</td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="end_date">End Date:</label>
                </td>
                <td>{project_details.end_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ProjectDetails;
