import React from 'react';

import ProjectSolution from '../../../model/ProjectSolution';

import FeaturesComponent from './FeaturesComponent';
import PricingComponent from './PricingComponent';
import ProjectURLsComponent from './ProjectURLsComponent';

interface SolutionProps {
  solution: ProjectSolution
}

const TheSolution: React.FC<SolutionProps> = ({ solution }) => {

  return (
    <>
      <>
        {solution && (
          <>
            <div className="project-solution" id="project_solution">
              {solution.features?.size > 0 && <FeaturesComponent features={solution.features} />}

              {solution.currency && solution.price && <PricingComponent currency={solution.currency} price={solution.price} />}

              {solution.urlsList && <ProjectURLsComponent projectUrls={solution.urlsList} />}

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
