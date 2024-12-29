import React from 'react';

interface DescriptionComponentProps {
  description: string;
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({ description }) => {

  return (
    description && (
      <div className="details-card card">
        <h4>{description}</h4>
      </div>
    )
  );
}

export default DescriptionComponent;
