import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';

import { getProject } from '../controllers/portfolioSlice';

function Project() {
  const { project } = useParams();

  const {
    portfolioLoading,
    portfolioErrorMessage,
    title,
    description,
    features,
    currency,
    price,
    solution_gallery,
    project_urls,
    project_details,
    the_solution,
    the_problem,
    project_team,
    project_types,
    skills,
    frameworks,
    technologies,
  } = useSelector((state) => state.portfolio);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject(project));
  }, [dispatch, project]);

  if (portfolioLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className='project'>
      <>
        {portfolioErrorMessage ? (
          <main className='error-page'>
            <StatusBarComponent
              messageType={'error'}
              message={portfolioErrorMessage}
            />
          </main>
        ) : (
          <ProjectComponent
            title={title}
            description={description}
            features={features}
            currency={currency}
            price={price}
            solution_gallery={solution_gallery}
            project_urls={project_urls}
            project_details={project_details}
            the_solution={the_solution}
            the_problem={the_problem}
            project_team={project_team}
            project_types={project_types}
            skills={skills}
            frameworks={frameworks}
            technologies={technologies}
          />
        )}
      </>
    </section>
  );
}

export default Project;
