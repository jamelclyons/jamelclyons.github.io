import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectDevelopment from '@/model/ProjectDevelopment';
import Image from '@/model/Image';

import CheckList from './CheckList';
import ContentComponent from '../content/ContentComponent';
import Versions from './Versions';
import ImageComponent from '../ImageComponent';
import SkillsComponent from '../SkillsComponent';

import {
  signInWithGitHubPopup
} from '@/controllers/authSlice';
import StatusBar from '../StatusBar';
import Skills from '@/model/Skills';
import Task from '@/model/Task';
import ProjectSkills from '@/model/ProjectSkills';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkList, contentURL, repoURL, versionsList } = development;
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [showStatusBar, setShowStatusBar] = useState<string>('hide');
  const [messageType, setMessageType] = useState<string>('info');
  const [message, setMessage] = useState<string>('Click Log in with GitHub to gain access to the code.');
  const [skills, setSkills] = useState<ProjectSkills>(development.skills);

  const [tasks, setTasks] = useState<Set<Task>>(checkList.tasks);

  useEffect(() => {
    setTasks(checkList.tasks)
  }, [checkList, setTasks])

  useEffect(() => {
    if (!isAuthenticated) {
      setMessage('Click Log in with GitHub to gain access to the code.');
      setMessageType('info');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setMessage('Gain access to the source code on GitHub.');
      setMessageType('info');
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setMessage('Click Log in with GitHub to gain access to the code.');
      setMessageType('info');
    }
  }, []);

  useEffect(() => {
    setSkills(development.skills);
  }, [development]);

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

        <h4 className="title">development</h4>

        {skills && <SkillsComponent projectSkills={skills} />}

        {tasks.size > 0 && <CheckList tasks={Array.from(tasks)} />}

        {contentURL && <ContentComponent title={''} url={contentURL} />}

        <Versions projectVersions={development?.versionsList} />

        <button className='repo' onClick={handleSeeCode}>
          <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />
          <h3 className='title'>{
            isAuthenticated ?
              'See Code' : 'Login with GitHub'
          }</h3>
        </button>

        <StatusBar show={showStatusBar} messageType={messageType} message={message} />
      </div>
    }
    </>
  );
}

export default Development;
