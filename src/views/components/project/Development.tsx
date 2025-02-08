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
import StatusBarComponent from '../StatusBarComponent';
import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkList, contentURL, repoURL, versionsList, skills } = development;
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setMessage('Click Log in with GitHub to gain access to the code and/or obtain administrator privileges.'));
      dispatch(setMessageType('info'));
    }
  }, []);

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

        {!isAuthenticated && <StatusBarComponent />}
      </div>
    }
    </>
  );
}

export default Development;
