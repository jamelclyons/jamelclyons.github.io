import FeaturesComponent from './FeaturesComponent';
import PricingComponent from './PricingComponent';

function TheSolution(props) {
  const { solution } = props;

  return (
    <>
      <>
        {solution && (
          <>
            <div className="project-solution" id="project_solution">
              <FeaturesComponent features={solution.features} />

              <PricingComponent currency={solution.currency} price={solution.price} />

              <h3>THE SOLUTION</h3>

              <div
                className="card"
                dangerouslySetInnerHTML={{ __html: solution.content }}></div>
            </div>
          </>
        )}
      </>
    </>
  );
}

export default TheSolution;
