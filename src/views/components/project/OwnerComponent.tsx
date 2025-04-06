import React, { useEffect, useState } from 'react'

import Owner from '@/model/Owner'

interface OwnerComponentProps {
    owner: Owner;
}

const OwnerComponent: React.FC<OwnerComponentProps> = ({ owner }) => {
    const [type, setType] = useState<string | null>(null);
    const [login, setLogin] = useState<string | null>(null);
    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => { setType(owner.type.toLowerCase()) }, [owner, setType]);

    useEffect(() => { setLogin(owner.login) }, [owner, setLogin]);

    useEffect(() => { setAvatarURL(owner.avatarURL) }, [owner, setAvatarURL]);

    useEffect(() => {
        if (owner.type === 'User') {
            setName(owner.name)
        } else if (owner.type === 'Organization') {
            setName(owner.company ? owner.company : owner.name)
        }
    }, [owner, setName]);

    const handleClick = () => {
        window.location.href = `/#/${type}/${login}`;
    };

    return (
        <div className="organization">
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