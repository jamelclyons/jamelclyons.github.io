import Organization from '@/model/Organization'
import React from 'react'

interface HeaderOrganizationComponentProps {
    organization: Organization;
}

const HeaderOrganizationComponent: React.FC<HeaderOrganizationComponentProps> = ({ organization }) => {
    const { avatarURL, name } = organization;

    return (
        <div className='organization-header'>
            <img
                src={avatarURL}
                alt={`${name} avatar`}
            />
            <h2 className='title'>{name}</h2>
        </div>
    )
}

export default HeaderOrganizationComponent