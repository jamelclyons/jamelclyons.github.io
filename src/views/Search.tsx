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
import SkillsComponent from './components/SkillsComponent';

import Portfolio from '../model/Portfolio';
import HeaderTaxonomyComponent from './components/HeaderTaxonomyComponent';

interface SearchProps {
  portfolio: Portfolio;
}

const Search: React.FC<SearchProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taxonomy, term } = useParams<string>();

  const { projects, skills } = portfolio;

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
    <section className="search" id="top">
      <>
        {taxonomy && term && <HeaderTaxonomyComponent skill={skills.filter(taxonomy, term)} />}

        {
          projects &&
          projects.size > 0 &&
          (taxonomy && term) &&
          <ProjectsComponent projects={portfolio.filterProjects(taxonomy, term)} />
        }

        {skills && <SkillsComponent skills={skills} />}
      </>
    </section>
  );
}

export default Search;
