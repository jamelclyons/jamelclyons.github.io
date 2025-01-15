import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { AppDispatch, RootState } from '../model/store';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import TaxList from './components/TaxList';
import TaxListIcon from './components/TaxListIcon';

import Portfolio from '../model/Portfolio';
import Project from '../model/Project';

interface SearchProps {
  portfolio: Portfolio;
}

const Search: React.FC<SearchProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taxonomy, term } = useParams<string>();

  const { projects, skills } = portfolio;
  const { projectTypes, languages, frameworks, technologies } = skills;

  const { portfolioLoading, portfolioErrorMessage } = useSelector(
    (state: RootState) => state.portfolio
  );

  useEffect(() => {
    if (taxonomy && term) {
      const skillClass =
        taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1).toLowerCase();
      const skill = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();

      document.title = `Projects > ${skillClass} > ${skill}`;
    }
  }, [taxonomy, term]);

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
        {
          projects &&
          projects.size > 0 &&
          (taxonomy && term) &&
          <ProjectsComponent projects={portfolio.filterProjects(taxonomy, term)} />
        }

        {projectTypes.size > 0 && <TaxList taxonomies={projectTypes} title={'Project Types'} />}

        {languages.size > 0 && <TaxListIcon taxonomies={languages} title={'Languages'} />}

        {frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />}

        {technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'Technologies'} />}
      </>
    </section>
  );
}

export default Search;
