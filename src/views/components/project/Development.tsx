import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProjectSkillsComponent from './ProjectSkillsComponent';
import CheckListComponent from './CheckListComponent';
import Versions from './Versions';
import ContentComponent from '../content/ContentComponent';
import StatusBar from '../StatusBar';
import ImageComponent from '../ImageComponent';

import {
  signInWithGitHubPopup
} from '@/controllers/authSlice';

import type { AppDispatch, RootState } from '@/model/store';
import Image from '@/model/Image';
import RepoURL from '@/model/RepoURL';
import Project from '@/model/Project';
import RoadmapComponent from './RoadmapComponent';
import FeaturesRoadmap from '@/model/FeaturesRoadmap';
import ContentURL from '@/model/ContentURL';
import ProjectVersions from '@/model/ProjectVersions';
import CheckList from '@/model/CheckList';
import ProjectSkills from '@/model/ProjectSkills';
import ProjectQuery from '@/model/ProjectQuery';

interface DevelopmentProps {
  project: Project;
}

const Development: React.FC<DevelopmentProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [versions, setVersions] = useState<ProjectVersions | null>(null);
  const [featuresRoadmap, setFeaturesRoadmap] = useState<FeaturesRoadmap | null>(null)
  const [content, setContent] = useState<ContentURL | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);
  const [skills, setSkills] = useState<ProjectSkills | null>(null);
  const [repoURL, setRepoURL] = useState<RepoURL | null>(null);
  const [buttonTitle, setButtonTitle] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (project.process && project.process.development
      && project.process.development.versionsList) {
      setVersions(project.process.development.versionsList)
    }
  }, [project]);

  useEffect(() => {
    if (project.solution && project.solution.features) {
      setFeaturesRoadmap(new FeaturesRoadmap(project.solution.features))
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.development
      && project.process.development.contentURL
      && project.process.development.contentURL.path === 'Development.md') {
      setContent(project.process.development.contentURL)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.development
      && project.process.development.checkList) {
      setCheckList(project.process.development.checkList)
    }
  }, [project]);

  useEffect(() => {
    if (project?.query) {
      setQuery(project.query)
    }
  }, [project?.query]);

  useEffect(() => {
    if (project.process && project.process.development
      && project.process.development.skills) {
      setSkills(project.process.development.skills)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.development
      && project.process.development.repoURL) {
      setRepoURL(project.process.development.repoURL)
    }
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

  const hasContent = versions || featuresRoadmap || content || (checkList && query) || skills;

  return (
    <>{hasContent &&
      <div className="project-process-development" id="project_process_development">

        <h3 className="title">development</h3>

        {versions && <Versions projectVersions={versions} />}

        {featuresRoadmap && <RoadmapComponent roadmap={featuresRoadmap} />}

        {content &&
          <ContentComponent title={''} content={content} />}

        {checkList && query && <CheckListComponent checkList={checkList} query={query} />}

        {skills && <ProjectSkillsComponent project={project} />}

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
