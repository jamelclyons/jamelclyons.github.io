import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import Image from '@/model/Image';
import RepoURL from '@/model/RepoURL';

import ProjectSkillsComponent from './ProjectSkillsComponent';
import CheckListComponent from './CheckListComponent';
import Versions from './Versions';

import ContentComponent from '../content/ContentComponent';
import StatusBar from '../StatusBar';
import ImageComponent from '../ImageComponent';

import {
  signInWithGitHubPopup
} from '@/controllers/authSlice';

import Project from '@/model/Project';
import RoadmapComponent from './RoadmapComponent';
import FeaturesRoadmap from '@/model/FeaturesRoadmap';
import ContentURL from '@/model/ContentURL';

interface DevelopmentProps {
  project: Project;
}

const Development: React.FC<DevelopmentProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [repoURL, setRepoURL] = useState<RepoURL | null>(null);
  const [buttonTitle, setButtonTitle] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (project.process && project.process.development
      && project.process.development.contentURL
      && project.process.development.contentURL.path === 'Development.md') {
      setContent(project.process.development.contentURL)
    }
  }, [project]);

  useEffect(() => {
    setRepoURL(project.process?.development?.repoURL ?? null)
  }, [project]);

  useEffect(() => {
    if (!isAuthenticated) {
      setButtonTitle('Log in with GitHub');
      setMessage('Click Log in with GitHub to gain access to the code.');
      setMessageType('info');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setButtonTitle('See Code');
      setMessage('Gain access to the source code on GitHub.');
      setMessageType('info');
    }
  }, [isAuthenticated]);

  const handleSeeCode = () => {
    if (isAuthenticated && repoURL && repoURL.url) {
      window.open(repoURL.url, '_blank');
    } else {
      dispatch(signInWithGitHubPopup());
    }
  };

  const hasContent = project.process?.development?.skills || project.process?.development?.checkList || project.process?.development?.contentURL || project.process?.development?.versionsList || project.process?.development?.repoURL;

  return (
    <>{project.process && project.process.development && hasContent &&
      <div className="project-process-development" id="project_process_development">

        <h3 className="title">development</h3>

        {project.process.development.checkList && project.query && <CheckListComponent checkList={project.process.development.checkList} query={project.query} />}

        {project.process.development.skills && <ProjectSkillsComponent project={project} />}

        {content &&
          <ContentComponent title={''} content={content} />}

        {project.process.development.versionsList && <Versions projectVersions={project.process.development.versionsList} />}

        {project.solution && project.solution.features && <RoadmapComponent roadmap={new FeaturesRoadmap(project.solution.features)} />}

        {repoURL && buttonTitle &&
          <button className='repo' onClick={handleSeeCode}>
            <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />
            <h3 className='title'>{buttonTitle}</h3>
          </button>}

        {messageType && message && <StatusBar show={'hide'} messageType={messageType} message={message} />}
      </div>
    }
    </>
  );
}

export default Development;
