import Organization from '@/model/Organization'
import React from 'react'
import DescriptionComponent from './DescriptionComponent';

interface HeaderOrganizationComponentProps {
    organization: Organization;
}

const OrganizationComponent: React.FC<HeaderOrganizationComponentProps> = ({ organization }) => {
    const { avatarURL, name } = organization;

    return (
        <div className='organization organization-header'>
            <img
                src={avatarURL}
                alt={`${name} avatar`}
            />
            <h2 className='title'>{name}</h2>
            <DescriptionComponent description={organization.description} />
        </div>
    )
}

export default OrganizationComponent