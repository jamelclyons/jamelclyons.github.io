import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectDevelopment from '../../../model/ProjectDevelopment';
import Image from '@/model/Image';
import Skills from '@/model/Skills';

import CheckList from './CheckList';
import ContentComponent from '../content/ContentComponent';
import ProjectURLs from './ProjectURLsComponent';
import Versions from './Versions';
import ImageComponent from '../ImageComponent';
import SkillsComponent from '../SkillsComponent';
import Taxonomy from '@/model/Taxonomy';

interface DevelopmentProps {
  development: ProjectDevelopment;
}

const Development: React.FC<DevelopmentProps> = ({ development }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkList, content, repoURL, versionsList, skills } = development;

  const [gitHub, setGitHub] = useState<Image>();

  useEffect(() => {
    if (repoURL) {
      try {
        setGitHub(new Image({ title: 'GitHub', url: '', class_name: 'fa fa-github fa-fw' }));
      } catch (error) {
        const err = error as Error;
        console.error('Invalid URL format:', err.message);
      }
    }
  }, [repoURL, dispatch]);

  const handleSeeCode = () => {
    window.open(repoURL, '_blank');
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

        {gitHub &&
          <button className='repo' onClick={handleSeeCode}>
            <h3 className='title'>
              <ImageComponent image={gitHub} />
              See Code</h3>
          </button>}
      </div>
    }</>
  );
}

export default Development;
