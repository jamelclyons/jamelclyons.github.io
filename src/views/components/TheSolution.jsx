import FeaturesComponent from './FeaturesComponent';
import PricingComponent from './PricingComponent';

function TheSolution(props) {
  const { features, currency, price, the_solution } = props;

  return (
    <>
      <>
        {the_solution && (
          <>
            <div className="project-solution" id="project_solution">
              <FeaturesComponent features={features} />

              <PricingComponent currency={currency} price={price} />
              <h3>THE SOLUTION</h3>

              <div
                className="card"
                dangerouslySetInnerHTML={{ __html: the_solution }}></div>
            </div>
          </>
        )}
      </>
    </>
  );
}

export default TheSolution;
