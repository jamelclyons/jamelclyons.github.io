import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { AppDispatch, RootState } from '../model/store';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';
import User from '@/model/User';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import HeaderTaxonomyComponent from './components/HeaderTaxonomyComponent';

interface SearchProps {
  user: User;
  skills: Skills
}

const Search: React.FC<SearchProps> = ({ user, skills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { taxonomy, term } = useParams<string>();

  const { portfolioLoading, portfolioErrorMessage, portfolioObject } = useSelector(
    (state: RootState) => state.portfolio
  );

  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio(portfolioObject ?? []));

  const { projects } = portfolio;

  useEffect(() => {
    if (term) {
      const skill = term.toUpperCase();

      document.title = skill;
    }
  }, [term]);

  useEffect(() => {
    if (portfolioObject === null) {
      dispatch(getPortfolio(user.repoQueries));
    }
  }, [portfolioObject, user, dispatch]);

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now Loading Portfolio'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolioErrorMessage) {
      dispatch(setMessage(portfolioErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [portfolioErrorMessage]);

  useEffect(() => {
    if (portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject));
    }
  }, [portfolioObject]);

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

        <SkillsComponent skillsUsed={null} />
      </>
    </section>
  );
}

export default Search;
