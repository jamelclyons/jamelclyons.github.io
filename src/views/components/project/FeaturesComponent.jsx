import React from 'react';

function FeaturesComponent(props) {
  const { features } = props;

  return (
    Array.isArray(features) && (
      <div className="product-features-card card">
        <h3>Features</h3>

        <div className="product-features">
          {features.map((feature) => (
            <>
              <p className="feature-name" id="feature_name">
                {feature.name}
              </p>
            </>
          ))}
        </div>
      </div>
    )
  );
}

export default FeaturesComponent;
