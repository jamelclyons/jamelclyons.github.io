import React, { useEffect, useState } from 'react'

import Organization from '@/model/Organization'

interface HeaderOrganizationComponentProps {
    organization: Organization;
}

const HeaderOrganizationComponent: React.FC<HeaderOrganizationComponentProps> = ({ organization }) => {
    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        if (organization.avatarURL) {
            setAvatarURL(organization.avatarURL)
        }
    }, [organization])

    useEffect(() => {
        if (organization.name) {
            setName(organization.name)
        }
    }, [organization])

    return (
        <div className='organization-header'>
            {avatarURL && <img
                src={avatarURL}
                alt={`${name} avatar`}
            />}
            {name && <h2 className='title'>{name}</h2>}
        </div>
    )
}

export default HeaderOrganizationComponent