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

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

interface AboutProps {
  user: User;
  skills: Skills;
}

const About: React.FC<AboutProps> = ({ user, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { githubLoading, contents } = useSelector((state: RootState) => state.github);
  const { portfolioLoading, portfolioObject, portfolioErrorMessage } = useSelector((state: RootState) => state.portfolio);

  const [story, setStory] = useState<string>();
  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio(portfolioObject ?? []));

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

  useEffect(() => {
    if (githubLoading) {
      dispatch(setMessage('Now Loading story'));
      dispatch(setShowStatusBar('show'));
    }
  }, [githubLoading]);

  useEffect(() => {
    if (portfolioObject === null) {
      dispatch(getPortfolio(user.repoQueries));
    }
  }, [portfolioObject, user, dispatch]);

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading Portfolio'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      dispatch(setMessage(portfolioErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [portfolioErrorMessage]);

  useEffect(() => {
    if (portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject));
    }
  }, [portfolioObject]);

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

        <SkillsComponent projectSkills={null} />

        {story ? <StoryComponent story={story} /> : <LoadingComponent />}

        <OrganizationsComponent organizations={user.organizations} />
      </section>
    </>
  );
};

export default About;
