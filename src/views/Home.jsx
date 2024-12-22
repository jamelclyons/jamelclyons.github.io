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

function Home(props) {
  const dispatch = useDispatch();

  const { user } = props;

  const { portfolio } = useSelector((state) => state.portfolio);
  const { projectTypes, languages, frameworks, technologies } = useSelector(
    (state) => state.taxonomies
  );

  useEffect(() => {
    document.title = 'Jamel C. Lyons';
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

        <ContactComponent />
      </section>
    </>
  );
}

export default Home;
