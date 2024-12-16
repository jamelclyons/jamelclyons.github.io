import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import About from './About';

import PortfolioComponent from './components/PortfolioComponent';
import MemberIntroductionComponent from './components/MemberComponent';
import MemberKnowledgeComponent from './components/MemberKnowledgeComponent';

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
      <About user={user} />
      <MemberIntroductionComponent />
      <MemberKnowledgeComponent
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
    </>
  );
}

export default Home;
