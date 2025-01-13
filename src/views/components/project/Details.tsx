import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectDetails from '../../../model/ProjectDetails';
import GitHubRepoQuery from '../../../model/GitHubRepoQuery';
import User from '../../../model/User';
import Owner from '@/model/Owner';

import ProjectTeamComponent from './ProjectTeam';

import { getContributors, getOrganization } from '../../../controllers/githubSlice';
import Organization from '@/model/Organization';

interface ProjectDetailsProps {
  details: ProjectDetails;
  owner: Owner;
  contributorsQuery: GitHubRepoQuery;
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ details, owner, contributorsQuery }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { privacy, clientID, startDate, endDate } = details;

  const [clientName, setClientName] = useState<string>(details.clientName);
  const [organization, setOrganization] = useState<Organization>(new Organization());
  const [teamList, setTeamList] = useState<Array<User>>();

  const { organizationObject } = useSelector(
    (state: RootState) => state.github
  );

  useEffect(() => {
    if (owner && owner.type === 'Organization') {
      dispatch(getOrganization(owner.login));
    }
  }, [owner, dispatch]);

  useEffect(() => {
    if (organizationObject) {
      setOrganization(new Organization(organizationObject));
    }
  }, [organizationObject]);

  useEffect(() => {
    if (organization && organization.name) {
      setClientName(organization.name);
    }
  }, [organization]);

  useEffect(() => {
    if (privacy === 'public' || clientID === '0') {
      const getTeamList = async () => {
        try {
          const result = await dispatch(getContributors(contributorsQuery));

          if (getContributors.fulfilled.match(result)) {
            const contributors = result.payload;

            const users: Array<User> = [];

            contributors.forEach((user) => {
              users.push(new User(user));
            })

            setTeamList(users);
          } else {
            console.error('Failed to fetch contributors');
          }
        } catch (error) {
          console.error('Error fetching team list:', error);
        }
      };

      getTeamList();
    }
  }, [privacy, clientID, dispatch]);

  return (
    <>
      {(privacy === 'public' || clientID === '0') && (
        <div className="project-details">
          <h3 className="title">the details</h3>

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

          {teamList &&
            <ProjectTeamComponent projectTeam={teamList} />
          }
        </div>
      )}
    </>
  );
}

export default ProjectDetailsComponent;
