import React, { useEffect, useState } from 'react'

import Project from '@/model/Project';

interface OwnerComponentProps {
    project: Project;
}

const OwnerComponent: React.FC<OwnerComponentProps> = ({ project }) => {
    const [type, setType] = useState<string | null>(null);
    const [login, setLogin] = useState<string | null>(null);
    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => { setType(project.owner.type.toLowerCase()) }, [project]);

    useEffect(() => { setLogin(project.owner.login) }, [project]);

    useEffect(() => { setAvatarURL(project.owner.avatarURL) }, [project]);

    useEffect(() => {
        if (project.owner.type === 'User') {
            setName(project.owner.name)
        } else if (project.owner.type === 'Organization') {
            setName(project.owner.company ? project.owner.company : project.owner.name)
        }
    }, [project]);

    const handleClick = () => {
        window.location.href = `/#/${type}/${login}`;
    };

    return (
        <div className="project-owner">
            <h2 className="title">project owner</h2>

            <button
                className="organizations-button"
                onClick={handleClick}>
                {avatarURL && <img
                    src={avatarURL}
                    alt={`${name} avatar`}
                />}
            </button>
            <h3>{name}</h3>
        </div>
    )
}

export default OwnerComponent