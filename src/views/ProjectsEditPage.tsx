import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';

import type { AppDispatch, RootState } from '@/model/store';
import User from '@/model/User';
import Project from '@/model/Project';
import Portfolio from '@/model/Portfolio';

import UpdatePortfolioProject from './components/update/UpdatePortfolioProject';

interface PortfolioEditPageProps {
    user: User;
}

const PortfolioEditPage: React.FC<PortfolioEditPageProps> = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { portfolioLoading, portfolioObject, portfolioErrorMessage } = useSelector((state: RootState) => state.portfolio);

    const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio(portfolioObject ?? []));
    const [projects, setProjects] = useState<Set<Project>>(portfolio.projects);

    useEffect(() => {
        if (portfolioLoading) {
            dispatch(setMessage('Now Loading Portfolio'));
            dispatch(setShowStatusBar('show'));
        }
    }, [portfolioLoading]);

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
        if (portfolioObject) {
            setPortfolio(new Portfolio(portfolioObject));
        }
    }, [portfolioObject]);

    useEffect(() => {
        setProjects(portfolio.projects);
    }, [portfolio]);

    useEffect(() => {
        if (portfolioErrorMessage) {
            dispatch(setMessage(portfolioErrorMessage));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [portfolioErrorMessage]);

    return (
        <section>
            {projects.size > 0 && (
                Array.from(projects).map((project, index) => (
                    <UpdatePortfolioProject key={index} project={project} />
                ))
            )}
        </section>
    )
}

export default PortfolioEditPage