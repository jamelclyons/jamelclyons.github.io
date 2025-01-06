import React from 'react'
import { useNavigate } from 'react-router-dom';

import Project from '../../../model/Project'

import ProjectStatus from '../ProjectStatusComponent';
import ProjectDescription from './ProjectDescription';

interface PortfolioProjectProps {
    project: Project
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ project }) => {
    const { id, title, description, solution, process } = project;

    const navigate = useNavigate();

    const handleClick = (path: string) => {
        navigate(path, { state: project })
    }

    return (
        <button onClick={() => handleClick(`/portfolio/${id}`)}>
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

                {project.process && (
                    <ProjectStatus projectStatus={process.status} />
                )}
            </div>
        </button>)
}

export default PortfolioProject