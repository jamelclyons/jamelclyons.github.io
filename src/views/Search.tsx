import React, { useEffect } from 'react';
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
import { getAuthenticatedUserAccount } from '@/controllers/userSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import HeaderTaxonomyComponent from './components/HeaderTaxonomyComponent';

interface SearchProps {
  user: User;
  portfolio: Portfolio;
  skills: Skills
}

const Search: React.FC<SearchProps> = ({ user, portfolio, skills }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taxonomy, term } = useParams<string>();

  const { projects } = portfolio;

  const { portfolioLoading, portfolioErrorMessage ,portfolioObject} = useSelector(
    (state: RootState) => state.portfolio
  );
  const { authenticatedUserObject } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (term) {
      const skill = term.toUpperCase();

      document.title = skill;
    }
  }, [term]);

  useEffect(() => {
    if (authenticatedUserObject === null) {
      dispatch(getAuthenticatedUserAccount());
    }
  }, [authenticatedUserObject, dispatch]);

    useEffect(() => {
      if (portfolioObject === null) {
        dispatch(getPortfolio(user.repoQueries));
      }
    }, [portfolioObject, user, dispatch]);

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

        <SkillsComponent skillsUsed={null} />
      </>
    </section>
  );
}

export default Search;
