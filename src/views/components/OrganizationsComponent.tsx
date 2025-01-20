import React from 'react'

import Organization from '@/model/Organization';

import DescriptionComponent from './DescriptionComponent';

import { spaceToPath } from '@/utilities/String';

interface OrganizationsComponentProps {
  organizations: Array<Organization>;
}

const OrganizationsComponent: React.FC<OrganizationsComponentProps> = ({ organizations }) => {
  const handleClick = (organization: Organization) => {
    handleOrganizations();
    const name = spaceToPath(organization.name);
    window.location.href = `/#/orgs/${name}`;
  };

  const handleOrganizations = () => {
    const element = document.getElementById('top');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {Array.isArray(organizations) && organizations.length > 0 && (
        <div className="organizations">
          <h2 className="title">
            {organizations.length === 1
              ? 'Organization'
              : 'Organizations'}
          </h2>

          {organizations.map((organization, index) => (
            <div className="organization" key={index}>
              <button
                key={index}
                className="organizations-button"
                onClick={() => handleClick(organization)}>
                <img
                  src={organization.avatarURL}
                  alt={`${organization.name} avatar`}
                />
              </button>
              <h3>{organization.name}</h3>
              <DescriptionComponent description={organization.description} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default OrganizationsComponent;