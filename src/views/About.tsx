import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { marked } from 'marked';

import MemberInfoComponent from './components/member/MemberInfoComponent';
import ContentComponent from './components/content/ContentComponent';

import { getRepoContents } from '../controllers/githubSlice';
import { loadMarkdown } from '../controllers/contentSlice';

import type { AppDispatch, RootState } from '../model/store';
import RepoContent from '../model/RepoContent';
import User from '../model/User';

interface AboutProps {
  user: User;
}

const About: React.FC<AboutProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { contents } = useSelector((state: RootState) => state.github);

  const [content, setContent] = useState<RepoContent>();
  const [markdown, setMarkdown] = useState<string | object>();

  useEffect(() => {
    document.title = `About - ${user.name}`;
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getRepoContents({
        owner: user.id,
        repo: user.id,
        path: ''
      }))
    }
  }, []);

  useEffect(() => {
    console.log(contents)
  }, [contents]);

  useEffect(() => {
    if (Array.isArray(contents) && contents.length > 0) {
      contents.map((content) => {
        if (content.type === 'file') {
          if (content.name === 'README.md') {
            setContent(new RepoContent(content));
          }
        }
      });
    }
  }, [contents]);

  useEffect(() => {
    if (content) {
      loadMarkdown(content.downloadURL)
        .then((markdown) => {
          if (typeof markdown === 'string') {
            setMarkdown(marked(markdown).valueOf());
          }
        });
    }
  }, [contents, content]);

  const handleResume = () => {
    window.location.href = '/#/resume';
  };

  return (
    <>
      <section className="about">
        <MemberInfoComponent user={user} />

        <button onClick={handleResume}>
          <h3 className="title">resume</h3>
        </button>

        <div className="story">
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
