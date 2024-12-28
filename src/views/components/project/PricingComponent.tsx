import React from 'react';

interface PricingComponentProps {
  currency: string;
  price: number;
}

const PricingComponent: React.FC<PricingComponentProps> = ({ currency, price }) => {

  return (
    <>
      {currency && (
        <div className="pricing">
          <h4>
            {/* {price && new Intl.NumberFormat("en-US", {
              style: 'currency',
              currency: currency || 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price)} */}
          </h4>
        </div>
      )}
    </>
  );
}

export default PricingComponent;
