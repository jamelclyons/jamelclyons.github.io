import React from 'react';

import Member from '../member/MemberCard';

import User from '../../../model/User';

interface ProjectTeamComponentProps {
  projectTeam: Array<User>
}

const ProjectTeamComponent: React.FC<ProjectTeamComponentProps> = ({ projectTeam }) => {

  return (
    <>
      {Array.isArray(projectTeam) && projectTeam.length > 0 && (
        <div className="project-team">
          <h4 className="title">Project Team</h4>

          <div className="project-team-list">
            {projectTeam.map((team_member, index) => (
              <Member key={index} user={team_member} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectTeamComponent;
