import React from 'react';

import ProjectDetails from '@/model/ProjectDetails';

import ProjectTeamComponent from './Team';
import User from '@/model/User';

interface ProjectDetailsProps {
  user: User;
  details: ProjectDetails;
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ user, details }) => {
  const { clientName, privacy, clientID, startDate, endDate, teamList } = details;

  return (
    <>
      {(privacy === 'public' || clientID !== '0') && (
        <div className="project-details">
          <h3 className="title">the details</h3>

          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="client_name">Client:</label>
                </td>
                <td>{clientName}</td>
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

          {teamList &&
            <ProjectTeamComponent user={user} projectTeam={teamList} />
          }
        </div>
      )}
    </>
  );
}

export default ProjectDetailsComponent;
