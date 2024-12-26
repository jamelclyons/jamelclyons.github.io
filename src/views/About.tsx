import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MemberInfoComponent from './components/member/MemberInfoComponent';
import ContentComponent from './components/ContentComponent';
import ImageComponent from './components/ImageComponent';

import { getContent } from '../controllers/contentSlice';

import type { AppDispatch, RootState } from '../model/store';

import User from '../model/User';

interface AboutProps {
  user: User;
}

const About: React.FC<AboutProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { content } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    document.title = `About - ${user.name}`;
  }, []);

  useEffect(() => {
    dispatch(getContent('about'));
  }, [dispatch]);

  const handleResume = () => {
    window.location.href = '/#/resume';
  };

  const mailTo = `mailto:${user?.email}`;
  const callNow = `tel:+${user?.phone}`;

  return (
    <>
      <section className="about">
        <MemberInfoComponent user={user} />

        <div className="user-contact">
          <a href={mailTo} target="_blank">
            <ImageComponent image={user?.images?.email} />
          </a>

          <a href={callNow} target="_blank">
            <ImageComponent image={user?.images?.phone} />
          </a>
        </div>

        <button onClick={handleResume}>
          <h3 className="title">resume</h3>
        </button>

        {Array.isArray(content.story) && (
          <div className="story">
            <ContentComponent content={content.story} />
          </div>
        )}

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
                  src={organization.avatar_url}
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
