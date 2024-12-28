import React from 'react';

import Feature from '../../../model/Feature';

interface FeaturesComponentProps {
  features: Set<Feature>
}

const FeaturesComponent: React.FC<FeaturesComponentProps> = ({ features }) => {

  return (
    features.size > 0 && (
      <div className="product-features-card card">
        <h3>Features</h3>

        <div className="product-features">
          {Array.from(features).map((feature) => (
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
