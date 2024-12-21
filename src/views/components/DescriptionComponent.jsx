import React from 'react';

function DescriptionComponent(props) {
  const { description } = props;

  return (
    description && (
      <div className="details-card card">
        <h4>{description}</h4>
      </div>
    )
  );
}

export default DescriptionComponent;
