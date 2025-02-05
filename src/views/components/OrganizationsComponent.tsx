import React from 'react'

import Organizations from '@/model/Organizations';
import Organization from '@/model/Organization';

import DescriptionComponent from './DescriptionComponent';

interface OrganizationsComponentProps {
  organizations: Organizations;
}

const OrganizationsComponent: React.FC<OrganizationsComponentProps> = ({ organizations }) => {
  const { list } = organizations;

  const handleClick = (organization: Organization) => {
    handleOrganizations();
    window.location.href = `/#/orgs/${organization.login}`;
  };

  const handleOrganizations = () => {
    const element = document.getElementById('top');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {Array.isArray(list) && list.length > 0 && (
        <div className="organizations">
          <h2 className="title">
            {list.length === 1
              ? 'Organization'
              : 'Organizations'}
          </h2>

          {list.map((organization, index) => (
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