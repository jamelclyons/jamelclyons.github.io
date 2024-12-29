import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';

import { getPortfolio } from '../controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from '../controllers/taxonomiesSlice';

import type { AppDispatch, RootState } from '../model/store';

import User from '../model/User';

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { portfolio } = useSelector((state: RootState) => state.portfolio);
  const { projectTypes, languages, frameworks, technologies } = useSelector(
    (state: RootState) => state.taxonomies
  );
  const { organizations, repos } = useSelector((state: RootState) => state.github);

  useEffect(() => {
    document.title = user?.name;
  }, []);

  useEffect(() => {
    dispatch(getPortfolio());
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
