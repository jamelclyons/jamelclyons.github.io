import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProjectsBy } from '../controllers/portfolioSlice';

import LoadingComponent from './components/LoadingComponent';
import ProjectsComponent from './components/ProjectsComponent';
import StatusBarComponent from './components/StatusBarComponent';

function Search() {
  const { taxonomy } = useParams();

  const { portfolioLoading, projects, portfolioErrorMessage } = useSelector(
    (state) => state.portfolio
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsBy(taxonomy));
  }, [dispatch]);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className='search'>
      <>
        {projects ? (
          <ProjectsComponent projects={projects} />
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

export default Search;
