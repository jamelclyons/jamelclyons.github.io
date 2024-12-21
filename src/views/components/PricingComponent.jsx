import React from 'react';

function PricingComponent(props) {
  const { currency, price } = props;

  return (
    <>
      {currency && (
        <div className="pricing">
          <h4>
            {new Intl.NumberFormat('us', {
              style: 'currency',
              currency: currency,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price)}
          </h4>
        </div>
      )}
    </>
  );
}

export default PricingComponent;
