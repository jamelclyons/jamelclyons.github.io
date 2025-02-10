import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from '../LoadingComponent';
import ProjectsComponent from './ProjectsComponent';
import SkillsComponent from '../SkillsComponent';

import type { AppDispatch, RootState } from '@/model/store';
import Portfolio from '@/model/Portfolio';

import { setMessage, setShowStatusBar } from '@/controllers/messageSlice';
import Project from '@/model/Project';

interface PortfolioComponentProps {
  portfolio: Portfolio;
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { portfolioLoading } = useSelector((state: RootState) => state.portfolio);

  const [projects, setProjects] = useState<Set<Project>>();

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessage('Now Loading Portfolio'));
      dispatch(setShowStatusBar('show'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (portfolio.projects instanceof Set && portfolio.projects.size > 0) {
      setProjects(portfolio.projects);
    }
  }, [portfolio]);

  return (
    <>
      {projects && projects.size > 0 ? (
        <main className="portfolio">
          <h1 className="title">portfolio</h1>

          <ProjectsComponent projects={projects} />

          <SkillsComponent skillsUsed={null} />
        </main>
      ) : <LoadingComponent />}
    </>
  );
}

export default PortfolioComponent;
