import React, { useEffect, useState } from 'react';

import User from '@/model/User';
import Project from '@/model/Project';
import Portfolio from '@/model/Portfolio';

import UpdatePortfolioProject from './components/update/components/UpdatePortfolioProject';

interface PortfolioEditPageProps {
    user: User;
}

const PortfolioEditPage: React.FC<PortfolioEditPageProps> = ({ user }) => {
    const [portfolio, setPortfolio] = useState<Portfolio | null>(user.portfolio);
    const [projects, setProjects] = useState<Set<Project>>(portfolio && portfolio.projects ? portfolio.projects : new Set);

    useEffect(() => {
        if (user.portfolio) {
            setPortfolio(user.portfolio);
        }
    }, [user]);

    useEffect(() => {
        if (portfolio && portfolio.projects) {
            setProjects(portfolio.projects);
        }
    }, [portfolio]);

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