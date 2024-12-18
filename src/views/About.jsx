import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMissionStatement } from '../controllers/aboutSlice';
import { getContent } from '../controllers/contentSlice';
import {
  getUser,
  getOrganizations,
  getRepos,
  getSocialAccounts,
} from '../controllers/githubSlice';

import ContentComponent from './components/ContentComponent';
import LoadingComponent from './components/LoadingComponent';
import FoundersComponent from './components/FoundersComponent';
import Member from './components/Member';

function About(props) {
  const { user } = props;
console.log(user);
  return (
    <>
      <main className="about">
        <div className="mission-statement-card card">
          <h3 className="mission-statement">
            <q>{user.bio}</q>
          </h3>
        </div>

        <Member url={user.avatar_url} email={user.email} />
      </main>
    </>
  );
}

export default About;
