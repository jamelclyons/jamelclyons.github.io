import React from 'react'

import Organization from '@/model/Organization';

interface OrganizationsComponentProps {
  organizations: Array<Organization>;
}

const OrganizationsComponent: React.FC<OrganizationsComponentProps> = ({ organizations }) => {

  const handleClick = (organization: Organization) => {
    handleOrganizations();
    window.location.href = `/#/orgs/${organization.login}`;
  };

  const handleOrganizations = () => {
    const skillsElement = document.getElementById('top');

    if (skillsElement) {
      skillsElement.scrollIntoView({ behavior: 'smooth' });
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
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default OrganizationsComponent;