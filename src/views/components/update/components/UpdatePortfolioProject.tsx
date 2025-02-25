import React from 'react'

import Project from '@/model/Project'

import ProjectCard from '../../project/ProjectCard';

interface UpdatePortfolioProjectProps {
    project: Project
}

const UpdatePortfolioProject: React.FC<UpdatePortfolioProjectProps> = ({ project }) => {
    const { id, owner } = project;

    return (
        <a className='project' href={`/#/admin/update/project/${owner.login}/${id}`}>
            <ProjectCard project={project} />
        </a>
    )
}

export default UpdatePortfolioProject