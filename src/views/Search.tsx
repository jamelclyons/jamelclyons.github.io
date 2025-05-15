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
import Project from '@/model/Project';

interface SearchProps {
  user: User;
  skills: Skills
}

const Search: React.FC<SearchProps> = ({ user, skills }) => {
  const { taxonomy, term } = useParams<string>();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(user.portfolio);
  const [projects, setProjects] = useState<Set<Project>>(new Set);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [taxonomy, term]);

  useEffect(() => {
    if (term) {
      const skill = term.toUpperCase();

      document.title = skill;
    }
  }, [term]);

  useEffect(() => {
    if (user.repos) {
      setPortfolio(user.portfolio);
    }
  }, [user]);

  useEffect(() => {
    if (portfolio && taxonomy && term) {
      setProjects(portfolio.filterProjects(taxonomy, term));
    }
  }, [portfolio, taxonomy, term]);

  return (
    <section className="search" id="top">
      <>
        {taxonomy && term && <HeaderTaxonomyComponent skill={skills.filter(taxonomy, term)} />}

        {portfolio &&
          projects &&
          (taxonomy && term) &&
          <ProjectsComponent projects={projects} />
        }

        <SkillsComponent projectSkills={null} />
      </>
    </section>
  );
}

export default Search;
