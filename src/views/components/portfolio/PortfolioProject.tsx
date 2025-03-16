import React from 'react';

import ProjectCard from '../ProjectCard';

import Project from '@/model/Project';

interface PortfolioProjectProps {
    project: Project
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ project }) => {
    const { id, owner } = project;

    return (
        <a href={`/#/portfolio/${owner.login}/${id}`}>
            <ProjectCard project={project} />
        </a>
    )
}

export default PortfolioProject