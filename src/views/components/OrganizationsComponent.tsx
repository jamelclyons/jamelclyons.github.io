import React from 'react'

import Organization from '@/model/Organization';

interface OrganizationsComponentProps {
  organizations: Array<Organization>;
}

const OrganizationsComponent: React.FC<OrganizationsComponentProps> = ({ organizations }) => {
  console.log(organizations)
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
            <div className="organization">
              <a href={organization.url} key={index}>
                <img
                  src={organization.avatarURL}
                  alt={`${organization.name} avatar`}
                />
              </a>
              <h3>{organization.name}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default OrganizationsComponent;