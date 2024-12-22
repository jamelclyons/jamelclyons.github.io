import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MemberInfoComponent from './components/member/MemberInfoComponent';
import ContentComponent from './components/ContentComponent';
import { getContent } from '../controllers/contentSlice';

function About(props) {
  const { user } = props;

  const { content } = useSelector((state) => state.content);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `About - Jamel C. Lyons`;
  }, []);

  useEffect(() => {
    dispatch(getContent('about'));
  }, [dispatch]);

  return (
    <>
      <section className="about">
        <MemberInfoComponent user={user} />

        {Array.isArray(content.story) && (
          <div className="story">
            <ContentComponent content={content.story} />
          </div>
        )}
      </section>
    </>
  );
}

export default About;
