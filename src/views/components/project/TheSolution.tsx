import React from 'react';

import ProjectSolution from '../../../model/ProjectSolution';

import FeaturesComponent from './FeaturesComponent';
import PricingComponent from './PricingComponent';
import ProjectURLsComponent from './ProjectURLsComponent';
import GalleryComponent from '../Gallery';

interface SolutionProps {
  solution: ProjectSolution
}

const TheSolution: React.FC<SolutionProps> = ({ solution }) => {
  const { features, currency, price, urlsList, gallery, content } = solution;

  return (
    <>
      <>
        {!solution.isEmpty && (
          <>
            <div className="project-solution" id="project_solution">
              {gallery.images?.length > 0 && <GalleryComponent gallery={gallery.images} title='' />}
              
              {features?.size > 0 && <FeaturesComponent features={features} />}

              {currency && price && <PricingComponent currency={currency} price={price} />}

              {urlsList && <ProjectURLsComponent projectUrls={urlsList} />}

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
