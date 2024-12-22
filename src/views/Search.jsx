import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProjectsBy } from '../controllers/portfolioSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';

import ProjectsComponent from './components/portfolio/ProjectsComponent';

function Search() {
  const { portfolioLoading, projects, portfolioErrorMessage } = useSelector(
    (state) => state.portfolio
  );

  const dispatch = useDispatch();

  const path = window.location.hash;
  const parts = path?.split('/');
  const taxonomy = parts[2]?.replace(/-/g, '_') ?? '';
  const term = parts[3] ?? '';
  const params = {
    taxonomy: taxonomy,
    term: term,
  };

  useEffect(() => {
    if (path) {
      dispatch(getProjectsBy(params));
    }
  }, [path, dispatch]);

  useEffect(() => {
    if (path) {
      const skillClass =
        taxonomy?.charAt(0).toUpperCase() + taxonomy?.slice(1).toLowerCase() ?? '';
      const skill = term?.charAt(0).toUpperCase() + term?.slice(1).toLowerCase() ?? '';

      document.title = `Projects > ${skillClass} > ${skill}`;
    }
  }, [path, taxonomy, term]);

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      dispatch(setMessage(portfolioErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [portfolioErrorMessage]);

  return (
    <section className="search">
      <>
        <ProjectsComponent projects={projects} />
      </>
    </section>
  );
}

export default Search;
