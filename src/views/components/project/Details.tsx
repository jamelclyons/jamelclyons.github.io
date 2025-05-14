import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProjectTeamComponent from './Team';
import ContentComponent from '../content/ContentComponent';

import type { RootState } from '@/model/store';
import User from '@/model/User';
import Project from '@/model/Project';
import Contributor from '@/model/Contributor';

interface ProjectDetailsProps {
  user: User;
  project: Project;
}

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ user, project }) => {
  const [privacy, setPrivacy] = useState(project.details?.privacy);
  const [contributors, setContributors] = useState<Array<Contributor> | null>(null);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setPrivacy(project.details?.privacy ?? 'private')
  }, [project]);

  useEffect(() => {
    if (project.details && project.details.teamList && project.details.teamList.length > 0) {
      setContributors(project.details.teamList)
    }
  }, [project]);

  return (
    <>
      {
        project && project.details &&
        (project.details.content || contributors || project.details.repoSize) && (
          <div className="project-details">
            <h3 className="title">the details</h3>

            {project.details.content &&
              <ContentComponent title={null} content={project.details.content} />}

            {contributors &&
              <ProjectTeamComponent user={user} projectTeam={contributors} />}

            {project.details.repoSize &&
              <h5>
                Repo Size
                <span className='colon'>:</span>
                <span className='repo-size'>{project.details.repoSize.display()}</span>
              </h5>}
          </div>
        )}
    </>
  );
}

export default ProjectDetailsComponent;
