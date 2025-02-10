import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MemberPic from './components/member/MemberPic';
import SkillsComponent from './components/SkillsComponent';
import OrganizationsComponent from './components/OrganizationsComponent';
import StoryComponent from './components/StoryComponent';
import LoadingComponent from './components/LoadingComponent';

import { getRepoContents } from '@/controllers/githubSlice';

import type { AppDispatch, RootState } from '@/model/store';
import User from '@/model/User';
import Skills from '@/model/Skills';
import RepoContentQuery from '@/model/RepoContentQuery';
import Portfolio from '@/model/Portfolio';

import { setMessage, setShowStatusBar } from '@/controllers/messageSlice';

interface AboutProps {
  user: User;
  portfolio: Portfolio;
  skills: Skills;
}

const About: React.FC<AboutProps> = ({ user, portfolio, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { githubLoading, contents } = useSelector((state: RootState) => state.github);

  const [story, setStory] = useState<string>();

  useEffect(() => {
    document.title = `About - ${user.name}`;
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getRepoContents(
        new RepoContentQuery(
          user.id,
          user.id,
          '',
          'main'
        )))
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(contents) && contents.length > 0) {
      contents.map((content) => {
        if (content.type === 'file') {
          if (content.name === 'story.md') {
            setStory(content.download_url);
          }
        }
      });
    }
  }, [contents]);

useEffect(()=>{
  if(githubLoading){
    dispatch(setMessage('Now Loading story'));
    dispatch(setShowStatusBar('show'));
  }
},[githubLoading]);

  const handleProjects = () => {
    window.location.href = '/#/portfolio';
  };

  const handleSkills = () => {
    const skillsElement = document.getElementById('skills');

    if (skillsElement) {
      skillsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStory = () => {
    const storyElement = document.getElementById('story');

    if (storyElement) {
      storyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResume = () => {
    window.location.href = '/#/resume';
  };

  return (
    <>
      <section className="about" id='top'>
        <div className='stats'>
          <div className="stats-user">
            <MemberPic user={user} />

            <h2 className="title">{user.title}</h2>
          </div>

          <div className="stats-bar">
            <div className="badge">
              <div className="badge-number">
                <h5>{portfolio.projects.size}</h5>
              </div>

              <button onClick={handleProjects}>
                <h3 className="title">projects</h3>
              </button>
            </div>

            <div className="badge">
              <div className="badge-number">
                <h5>{skills.count}</h5>
              </div>

              <button onClick={handleSkills}>
                <h3 className="title">skills</h3>
              </button>
            </div>

            <button onClick={handleStory}>
              <h3 className="title">story</h3>
            </button>

            <button onClick={handleResume}>
              <h3 className="title">resume</h3>
            </button>
          </div>
        </div>

        <SkillsComponent skillsUsed={null} />

        {story ? <StoryComponent story={story} /> : <LoadingComponent />}

        <OrganizationsComponent organizations={user.organizations} />
      </section>
    </>
  );
};

export default About;
