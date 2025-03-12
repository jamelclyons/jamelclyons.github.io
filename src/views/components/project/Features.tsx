import React from 'react';

import Feature from '../../../model/Feature';

interface FeaturesProps {
  features: Set<Feature>
}

const Features: React.FC<FeaturesProps> = ({ features }) => {

  return (
    features.size > 0 && (
      <div className="product-features-card card">
        <h4>Features</h4>

        <div className="product-features">
          {Array.from(features).map((feature) => (
            <>
              <p className="feature-name" id="feature_name" key={feature.id}>
                {feature.description}
              </p>
            </>
          ))}
        </div>
      </div>
    )
  );
}

export default Features;
