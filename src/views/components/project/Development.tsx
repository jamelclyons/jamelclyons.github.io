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
  const [skills, setSkills] = useState<Skills>(development.skills);

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
      checkList.length > 0 ||
      (typeof contentURL === 'string' && contentURL !== '') ||
      (versionsList?.current !== '' && versionsList?.previous.length > 0) ||
      repoURL !== '') &&
      <div className="project-process-development" id="project_process_development">

        <h4 className="title">development</h4>

        {skills && <SkillsComponent skillsUsed={skills} />}

        {checkList.length > 0 && <CheckList checkList={checkList} />}

        {contentURL && <ContentComponent title={''} url={contentURL} />}

        {/* <Versions versions_list={development?.versionsList} /> */}

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
