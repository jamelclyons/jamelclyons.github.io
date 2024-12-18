import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPortfolio } from '../controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies
} from '../controllers/taxonomiesSlice';

import LoadingComponent from './components/LoadingComponent';
import PortfolioComponent from './components/PortfolioComponent';

function Portfolio() {
  const { portfolioLoading, portfolioErrorMessage, portfolio } = useSelector(
    (state) => state.portfolio
  );
  const { projectTypes, skills, frameworks, technologies } = useSelector(
    (state) => state.taxonomies
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProjectTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFrameworks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTechnologies());
  }, [dispatch]);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PortfolioComponent
        portfolio={portfolio}
        projectTypes={projectTypes}
        skills={skills}
        frameworks={frameworks}
        technologies={technologies}
      />
    </>
  );
}

export default Portfolio;
