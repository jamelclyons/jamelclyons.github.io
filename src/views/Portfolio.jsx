import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPortfolio } from '../controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from '../controllers/taxonomiesSlice';

import LoadingComponent from './components/LoadingComponent';
import PortfolioComponent from './components/PortfolioComponent';
import StatusBarComponent from './components/StatusBarComponent';

function Portfolio() {
  const { portfolioLoading, portfolio, portfolioErrorMessage } = useSelector(
    (state) => state.portfolio
  );
  const { projectTypes, languages, frameworks, technologies } = useSelector(
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
    <section className='portfolio'>
      <>
        {portfolio ? (
          <PortfolioComponent
            portfolio={portfolio}
            projectTypes={projectTypes}
            languages={languages}
            frameworks={frameworks}
            technologies={technologies}
          />
        ) : (
          <StatusBarComponent
            messageType={'error'}
            message={portfolioErrorMessage}
          />
        )}
      </>
    </section>
  );
}

export default Portfolio;
