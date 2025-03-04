import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from '../LoadingComponent';
import ProjectsComponent from './ProjectsComponent';
import SkillsComponent from '../SkillsComponent';

import type { AppDispatch, RootState } from '@/model/store';
import Portfolio from '@/model/Portfolio';
import Project from '@/model/Project';
import User from '@/model/User';
import Organization from '@/model/Organization';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';
import { getPortfolio, getOrganizationPortfolio } from '@/controllers/portfolioSlice';

interface PortfolioComponentProps {
  account: User | Organization;
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({ account }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { portfolioLoading, portfolioObject, organizationPortfolioObject, portfolioErrorMessage } = useSelector((state: RootState) => state.portfolio);

  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio(portfolioObject ?? []));
  const [projects, setProjects] = useState<Set<Project>>();

  useEffect(() => {
    if (portfolioLoading) {
      dispatch(setMessage('Now Loading Portfolio'));
      dispatch(setShowStatusBar('show'));
    }
  }, [portfolioLoading]);

  useEffect(() => {
    if (account instanceof User && portfolioObject === null) {
      dispatch(getPortfolio(account.repoQueries));
    }
  }, [portfolioObject, account, dispatch]);

  useEffect(() => {
    if (account instanceof Organization && organizationPortfolioObject === null) {
      dispatch(getOrganizationPortfolio(account.repoQueries));
    }
  }, [organizationPortfolioObject, account, dispatch]);

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
    if (account instanceof User && portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject));
    }
  }, [account, portfolioObject]);

  useEffect(() => {
    if (account instanceof Organization && organizationPortfolioObject) {
      setPortfolio(new Portfolio(organizationPortfolioObject));
    }
  }, [account, organizationPortfolioObject]);

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

          <SkillsComponent projectSkills={null} />
        </main>
      ) : <LoadingComponent />}
    </>
  );
}

export default PortfolioComponent;
