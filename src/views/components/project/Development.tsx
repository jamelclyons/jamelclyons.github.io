import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectDevelopment from '@/model/ProjectDevelopment';
import Image from '@/model/Image';
import ProjectSkills from '@/model/ProjectSkills';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';
import ProjectVersions from '@/model/ProjectVersions';
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

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [skills, setSkills] = useState<ProjectSkills | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [contentURL, setContentURL] = useState<ContentURL | null>(null);
  const [repoURL, setRepoURL] = useState<RepoURL | null>(null);
  const [image, setImage] = useState<Image | null>(null);
  const [versionsList, setVersionsList] = useState<ProjectVersions | null>(null);
  const [buttonTitle, setButtonTitle] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (development.skills) {
      setSkills(development.skills);
    }
  }, [development.skills, setSkills]);

  useEffect(() => {
    if (development.checkList && development.checkList.tasks.size > 0) {
      setCheckList(development.checkList)
    }
  }, [development, setCheckList]);

  useEffect(() => {
    if (development.contentURL && development.contentURL.url) {
      setContentURL(development.contentURL)
    }
  }, [development, setContentURL]);

  useEffect(() => {
    if (development.repoURL && development.repoURL.url) {
      setRepoURL(development.repoURL)
    }
  }, [development, setRepoURL]);

  useEffect(() => {
    if (development.repoURL && development.repoURL.url) {
      setImage(new Image())
    }
  }, [development, setRepoURL]);

  useEffect(() => {
    if (development.versionsList && development.versionsList.current) {
      setVersionsList(development.versionsList)
    }
  }, [development, setVersionsList]);

  useEffect(() => {
    if (!isAuthenticated) {
      setButtonTitle('Log in with GitHub');
      setMessage('Click Log in with GitHub to gain access to the code.');
      setMessageType('info');
    }
  }, [isAuthenticated, setMessage, setMessageType]);

  useEffect(() => {
    if (isAuthenticated) {
      setButtonTitle('See Code');
      setMessage('Gain access to the source code on GitHub.');
      setMessageType('info');
    }
  }, [isAuthenticated, setMessage, setMessageType]);

  const handleSeeCode = () => {
    if (isAuthenticated && repoURL && repoURL.url) {
      window.open(repoURL.url, '_blank');
    } else {
      dispatch(signInWithGitHubPopup());
    }
  };

  const hasContent = skills || checkList || contentURL || versionsList || repoURL;

  return (
    <>{hasContent &&
      <div className="project-process-development" id="project_process_development">

        <h3 className="title">development</h3>

        {skills && <ProjectSkillsComponent projectSkills={skills} />}

        {checkList && <CheckListComponent checkList={checkList} />}

        {contentURL && <ContentComponent title={''} content={contentURL} />}

        {versionsList && <Versions projectVersions={versionsList} />}

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
