import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { marked } from 'marked';

import MemberPic from './components/member/MemberPic';
import SkillsComponent from './components/SkillsComponent';
import ContentComponent from './components/content/ContentComponent';

import { getRepoContents } from '../controllers/githubSlice';
// import { loadMarkdown } from '../controllers/contentSlice';

import type { AppDispatch, RootState } from '../model/store';
import RepoContent from '../model/RepoContent';
import User from '../model/User';
import Skills from '@/model/Skills';
import RepoContentQuery from '@/model/RepoContentQuery';
import OrganizationsComponent from './components/OrganizationsComponent';
import StoryComponent from './components/StoryComponent';
import Portfolio from '@/model/Portfolio';

interface AboutProps {
  user: User;
  portfolio: Portfolio;
  skills: Skills;
}

const About: React.FC<AboutProps> = ({ user, portfolio, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { contents } = useSelector((state: RootState) => state.github);

  const [content, setContent] = useState<RepoContent>();
  const [markdown, setMarkdown] = useState<string | object>();

  useEffect(() => {
    document.title = `About - ${user.name}`;
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getRepoContents(
        new RepoContentQuery(
          user.id,
          user.id,
          ''
        )))
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(contents) && contents.length > 0) {
      contents.map((content) => {
        if (content.type === 'file') {
          if (content.name === 'story.md') {
            setContent(new RepoContent(content));
          }
        }
      });
    }
  }, [contents]);

  // useEffect(() => {
  //   if (content) {
  //     loadMarkdown(content.downloadURL)
  //       .then((markdown) => {
  //         if (typeof markdown === 'string') {
  //           setMarkdown(marked(markdown).valueOf());
  //         }
  //       });
  //   }
  // }, [contents, content]);

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

        <SkillsComponent skills={skills} />

        {typeof markdown === 'string' && <StoryComponent story={markdown} />}

        <OrganizationsComponent organizations={user.organizations} />
      </section>
    </>
  );
};

export default About;
