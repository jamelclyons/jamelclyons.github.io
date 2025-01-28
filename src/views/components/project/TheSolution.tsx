import React from 'react';

import ProjectSolution from '../../../model/ProjectSolution';

import FeaturesComponent from './FeaturesComponent';
import PricingComponent from './PricingComponent';
import ProjectURLsComponent from './ProjectURLsComponent';
import GalleryComponent from '../Gallery';
import ContentComponent from '../content/ContentComponent';

interface SolutionProps {
  solution: ProjectSolution
}

const TheSolution: React.FC<SolutionProps> = ({ solution }) => {
  const { features, currency, price, urlsList, gallery, contentURL } = solution;

  return (
    <>
      {(features.size > 0 ||
        currency ||
        price > 0 ||
        urlsList?.homepage?.url === '' || urlsList?.ios?.url === '' || urlsList?.android?.url === '' ||
        gallery.images.length > 0 ||
        contentURL) &&
        <div className="project-solution" id="project_solution">
          {gallery.images.length > 0 && <GalleryComponent gallery={gallery.images} title='' />}

          {features.size > 0 && <FeaturesComponent features={features} />}

          {currency && price > 0 && <PricingComponent currency={currency} price={price} />}

          {urlsList && <ProjectURLsComponent projectUrls={urlsList} />}

          <h3>THE SOLUTION</h3>

          {contentURL && <ContentComponent title={null} url={contentURL} />}
        </div>
      }
    </>
  );
}

export default TheSolution;
