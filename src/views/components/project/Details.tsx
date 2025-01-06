import React, { useEffect, useState } from 'react';

import ProjectDetails from '../../../model/ProjectDetails';

interface ProjectDetailsProps {
  details: ProjectDetails
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ details }) => {
  return (
    <>
      {details ? (
        <div className="project-details">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="client_name">Client Name:</label>
                </td>
                <td>
                  <h4 className="company-name">
                    {details.clientName}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="start_date">Start Date:</label>
                </td>
                <td>{details.startDate}</td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="end_date">End Date:</label>
                </td>
                <td>{details.endDate}</td>
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

export default ProjectDetailsComponent;
