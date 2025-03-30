import React, { useEffect, useState } from 'react';

import ProjectDetails from '@/model/ProjectDetails';

import ProjectTeamComponent from './Team';
import User from '@/model/User';
import ContentComponent from '../content/ContentComponent';

interface ProjectDetailsProps {
  user: User;
  details: ProjectDetails;
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ user, details }) => {
  const [privacy, setPrivacy] = useState(details.privacy);
  const [teamList, setTeamList] = useState(details.teamList);
  const [content, setContent] = useState(details.content);

  useEffect(() => {
    setPrivacy(details.privacy)
  }, [details.privacy, setPrivacy]);

  useEffect(() => {
    setTeamList(details.teamList)
  }, [details.teamList, setTeamList]);

  useEffect(() => {
    setContent(details.content)
  }, [details.content, setContent]);

  return (
    <>
      {privacy === 'public' && (
        <div className="project-details">
          <h3 className="title">the details</h3>

          {content && <ContentComponent title={null} content={content} />}

          {teamList &&
            <ProjectTeamComponent user={user} projectTeam={teamList} />
          }
        </div>
      )}
    </>
  );
}

export default ProjectDetailsComponent;
