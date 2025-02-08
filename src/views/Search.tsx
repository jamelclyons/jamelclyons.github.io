import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { AppDispatch, RootState } from '../model/store';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import HeaderTaxonomyComponent from './components/HeaderTaxonomyComponent';

interface SearchProps {
  portfolio: Portfolio;
  skills: Skills
}

const Search: React.FC<SearchProps> = ({ portfolio, skills }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taxonomy, term } = useParams<string>();

  const { projects } = portfolio;

  const { portfolioLoading, portfolioErrorMessage } = useSelector(
    (state: RootState) => state.portfolio
  );

  useEffect(() => {
    if (term) {
      const skill = term.toUpperCase();

      document.title = skill;
    }
  }, [term]);

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

        {skills && <SkillsComponent skillsUsed={skills} />}
      </>
    </section>
  );
}

export default Search;
