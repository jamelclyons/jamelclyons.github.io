import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MemberInfoComponent from './components/member/MemberInfoComponent';
import ContentComponent from './components/ContentComponent';
import ImageComponent from './components/ImageComponent';

import { getAboutPageContent } from '../controllers/aboutSlice';

import type { AppDispatch, RootState } from '../model/store';

import User from '../model/User';

interface AboutProps {
  user: User;
}

const About: React.FC<AboutProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { aboutPage } = useSelector((state: RootState) => state.about);

  useEffect(() => {
    document.title = `About - ${user.name}`;
  }, []);

  useEffect(() => {
    dispatch(getAboutPageContent());
  }, [dispatch]);

  const handleResume = () => {
    window.location.href = '/#/resume';
  };

  const mailTo = `mailto:${user?.contactMethods.email.value}`;
  const callNow = `tel:+${user?.contactMethods.phone.value}`;

  return (
    <>
      <section className="about">
        <MemberInfoComponent user={user} />

        <div className="user-contact">
          <a href={mailTo} target="_blank">
            <ImageComponent image={user?.contactMethods.email} />
          </a>

          <a href={callNow} target="_blank">
            <ImageComponent image={user?.contactMethods.phone} />
          </a>
        </div>

        <button onClick={handleResume}>
          <h3 className="title">resume</h3>
        </button>

        {Array.isArray(aboutPage?.story) && (
          <div className="story">
            <ContentComponent content={aboutPage.story} />
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
