import React from 'react'

import Project from '@/model/Project'

import ProjectDescription from '../portfolio/ProjectDescription';

interface ProjectCardProps {
    project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { title, description, solution } = project;

    return (
        <div className="project-card card">
            <h2 className="title">{title}</h2>

            {Array.isArray(solution.gallery.images) &&
                solution.gallery.images.length > 0 ? (
                <img
                    className="photo"
                    src={solution.gallery.images[0].url}
                    alt={solution.gallery.images[0].title}
                />
            ) : (
                ''
            )}

            <ProjectDescription description={description} />
        </div>
    )
}

export default ProjectCard