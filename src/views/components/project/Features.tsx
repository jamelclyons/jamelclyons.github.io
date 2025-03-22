import React from 'react';

import Feature from '@/model/Feature';

interface FeaturesProps {
  features: Set<Feature>
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    features.size > 0 && (
      <div className="product-features-card card">
        <h3>Features</h3>

        <div className="product-features">
          {Array.from(features).map((feature) => (
            <p className="product-feature" key={feature.id}>
              <span className='product-feature-point'>-</span> {feature.description}
            </p>
          ))}
        </div>
      </div>
    )
  );
}

export default Features;
