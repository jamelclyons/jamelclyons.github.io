import React from 'react'

import Project from '@/model/Project'

import ProjectDescription from './ProjectDescription';
import ProjectCard from '../project/ProjectCard';

interface PortfolioProjectProps {
    project: Project
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ project }) => {
    const { id, owner } = project;

    return (
        <a className='project' href={`/#/portfolio/${owner.login}/${id}`}>
            <ProjectCard project={project} />
        </a>
    )
}

export default PortfolioProject