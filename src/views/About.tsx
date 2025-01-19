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
import GitHubRepoQuery from '@/model/GitHubRepoQuery';
import RepoContentQuery from '@/model/RepoContentQuery';

interface AboutProps {
  user: User;
}

const About: React.FC<AboutProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { contents } = useSelector((state: RootState) => state.github);
  const { skillsObject } = useSelector((state: RootState) => state.portfolio);

  const [content, setContent] = useState<RepoContent>();
  const [markdown, setMarkdown] = useState<string | object>();

  const skills = new Skills(skillsObject);

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
      <section className="about">
        <div className='stats'>
          <div className="stats-user">
            <MemberPic user={user} />

            <h2 className="title">{user?.title}</h2>
          </div>

          <div className="stats-bar">
            <button onClick={handleProjects}>
              <h3 className="title">projects</h3>
            </button>

            <button onClick={handleSkills}>
              <h3 className="title">skills</h3>
            </button>

            <button onClick={handleStory}>
              <h3 className="title">story</h3>
            </button>

            <button onClick={handleResume}>
              <h3 className="title">resume</h3>
            </button>
          </div>
        </div>

        <div className="skills" id="skills">
          <h2 className="title">skills</h2>

          <SkillsComponent skills={skills} />
        </div>

        <div className="story" id="story">
          <h2 className="title">story</h2>

          {typeof markdown === 'string' && markdown !== '' && <ContentComponent html={markdown} />}
        </div>

        {Array.isArray(user.organizations) && user.organizations.length > 0 && (
          <div className="organizations">
            <h2 className="title">
              {user.organizations.length === 1
                ? 'Organization'
                : 'Organizations'}
            </h2>

            {user.organizations.map((organization, index) => (
              <a href={organization.url} key={index}>
                <img
                  src={organization.avatarURL}
                  alt={`${organization.name} avatar`}
                />
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default About;
