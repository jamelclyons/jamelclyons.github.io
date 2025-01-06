import React, { useEffect, useState } from 'react';

import ProjectDetails from '../../../model/ProjectDetails';

interface ProjectDetailsProps {
  details: ProjectDetails
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ details }) => {
  const { clientID, clientName, startDate, endDate } = details;

  return (
    <>
      {clientID && clientName && startDate && endDate && (
        <div className="project-details">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="client_name">Client Name:</label>
                </td>
                <td>
                  <h4 className="company-name">
                    {clientName}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="start_date">Start Date:</label>
                </td>
                <td>{startDate}</td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="end_date">End Date:</label>
                </td>
                <td>{endDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ProjectDetailsComponent;
