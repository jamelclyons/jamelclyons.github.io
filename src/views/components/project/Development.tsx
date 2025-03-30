import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectDevelopment from '@/model/ProjectDevelopment';
import Image from '@/model/Image';
import Task from '@/model/Task';
import ProjectSkills from '@/model/ProjectSkills';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';
import ProjectVersions from '@/model/ProjectVersions';

import CheckListComponent from './CheckListComponent';
import Versions from './Versions';

import ContentComponent from '../content/ContentComponent';
import StatusBar from '../StatusBar';
import ImageComponent from '../ImageComponent';
import SkillsComponent from '../SkillsComponent';

import {
  signInWithGitHubPopup
} from '@/controllers/authSlice';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [skills, setSkills] = useState<ProjectSkills>(development.skills);
  const [checkList, setCheckList] = useState<CheckList>(development.checkList);
  const [tasks, setTasks] = useState<Set<Task>>(development.checkList.tasks);
  const [contentURL, setContentURL] = useState<ContentURL | null>(development.contentURL);
  const [repoURL, setRepoURL] = useState(development.repoURL);
  const [versionsList, setVersionsList] = useState<ProjectVersions>(development.versionsList);
  const [buttonTitle, setButtonTitle] = useState<string>();
  const [messageType, setMessageType] = useState<string>('info');
  const [message, setMessage] = useState<string>('Click Log in with GitHub to gain access to the code.');

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setSkills(development.skills);
  }, [development.skills, setSkills]);

  useEffect(() => {
    setCheckList(development.checkList)
  }, [development.checkList, setCheckList]);

  useEffect(() => {
    setTasks(development.checkList.tasks)
  }, [development.checkList.tasks, setTasks]);

  useEffect(() => {
    setContentURL(development.contentURL)
  }, [development.contentURL, setContentURL]);

  useEffect(() => {
    setRepoURL(development.repoURL)
  }, [development.repoURL, setRepoURL]);

  useEffect(() => {
    setVersionsList(development.versionsList)
  }, [development.versionsList, setVersionsList]);

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
    if (isAuthenticated) {
      window.open(repoURL, '_blank');
    } else {
      dispatch(signInWithGitHubPopup());
    }
  };

  return (
    <>{(
      skills ||
      tasks.size > 0 ||
      (typeof contentURL === 'string' && contentURL !== '') ||
      (versionsList?.current !== '' && versionsList?.history.size > 0) ||
      repoURL !== '') &&
      <div className="project-process-development" id="project_process_development">

        <h3 className="title">development</h3>

        {skills && <SkillsComponent projectSkills={skills} />}

        {tasks.size > 0 && <CheckListComponent checkList={checkList} />}

        {contentURL && <ContentComponent title={''} content={contentURL} />}

        <Versions projectVersions={development?.versionsList} />

        <button className='repo' onClick={handleSeeCode}>
          <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />
          <h3 className='title'>{buttonTitle}</h3>
        </button>

        <StatusBar show={'hide'} messageType={messageType} message={message} />
      </div>
    }
    </>
  );
}

export default Development;
