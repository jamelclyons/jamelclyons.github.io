import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProjectsBy } from '../controllers/portfolioSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';

import ProjectsComponent from './components/ProjectsComponent';

function Search() {
  const { portfolioLoading, projects, portfolioErrorMessage } = useSelector(
    (state) => state.portfolio
  );

  const dispatch = useDispatch();

  const path = window.location.hash;

  useEffect(() => {
    if (path) {
      const parts = path.split('/');
      const taxonomy = parts[2].replace(/-/g, '_');
      const term = parts[3];
      const params = {
        taxonomy: taxonomy,
        term: term,
      };

      dispatch(getProjectsBy(params));
    }
  }, [path, dispatch]);

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
