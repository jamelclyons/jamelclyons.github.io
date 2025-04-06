import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProjectTeamComponent from './Team';
import ContentComponent from '../content/ContentComponent';

import type { RootState } from '@/model/store';
import User from '@/model/User';
import Project from '@/model/Project';

interface ProjectDetailsProps {
  user: User;
  project: Project;
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ user, project }) => {
  const [privacy, setPrivacy] = useState(project.details?.privacy);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setPrivacy(project.details?.privacy ?? 'private')
  }, [project]);

  return (
    <>
      {(isAuthenticated || privacy === 'public') && (
        <div className="project-details">
          <h3 className="title">the details</h3>

          {project && project.details && project.details.content &&
            <ContentComponent title={null} content={project.details.content} />}

          {project && project.details && project.details.teamList &&
            <ProjectTeamComponent user={user} projectTeam={project.details.teamList} />}
        </div>
      )}
    </>
  );
}

export default ProjectDetailsComponent;
