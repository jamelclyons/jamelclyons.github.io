import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';

import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from '../controllers/taxonomiesSlice';

import type { AppDispatch, RootState } from '../model/store';

import User from '../model/User';
import Project from '../model/Project';

interface HomeProps {
  user: User;
  portfolio: Set<Project>;
}

const Home: React.FC<HomeProps> = ({ user, portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectTypes, languages, frameworks, technologies } = useSelector(
    (state: RootState) => state.taxonomies
  );

  useEffect(() => {
    document.title = user?.name;
  }, []);

  useEffect(() => {
    dispatch(getProjectTypes());
  }, []);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    dispatch(getFrameworks());
  }, []);

  useEffect(() => {
    dispatch(getTechnologies());
  }, []);

  return (
    <>
      <section className="home">
        <MemberIntroductionComponent
          user={user}
          languages={languages}
          frameworks={frameworks}
          technologies={technologies}
        />

        <PortfolioComponent
          portfolio={portfolio}
          projectTypes={projectTypes}
          languages={languages}
          frameworks={frameworks}
          technologies={technologies}
        />

        <ContactComponent user={user} />
      </section>
    </>
  );
}

export default Home;
