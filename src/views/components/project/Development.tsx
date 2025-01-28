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

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkList, content, repoURL, versionsList, skills } = development;
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

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
      (typeof content === 'string' && content !== '') ||
      (versionsList?.current !== '' && versionsList?.previous.length > 0) ||
      repoURL !== '') &&
      <div className="project-process-development" id="project_process_development">

        <h4 className="title">development</h4>

        {skills && <SkillsComponent skills={skills} />}

        {checkList.length > 0 && <CheckList checkList={checkList} />}

        {typeof content === 'string' && content !== '' && <ContentComponent html={content} />}

        {/* <Versions versions_list={development?.versionsList} /> */}

        <button className='repo' onClick={handleSeeCode}>
          <ImageComponent image={new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' })} />
          <h3 className='title'>{
            isAuthenticated ?
              'See Code' : 'Login to See Code'
          }</h3>
        </button>
      </div>
    }
    </>
  );
}

export default Development;
