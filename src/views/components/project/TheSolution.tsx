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
  const { features, currency, price, projectURLs, gallery, contentURL } = solution;

  const hasContent = features.size > 0 ||
    currency ||
    price > 0 ||
    projectURLs.homepage.url === '' || projectURLs.ios.url === '' || projectURLs.android.url === '' ||
    gallery.images.length > 0 ||
    contentURL;

  return (
    <>
      {hasContent &&
        <div className="project-solution" id="project_solution">
          {gallery.images.length > 0 && <GalleryComponent gallery={gallery.images} title='' />}

          {features.size > 0 && <FeaturesComponent features={features} />}

          {currency && price > 0 && <PricingComponent currency={currency} price={price} />}

          {projectURLs && <ProjectURLsComponent projectUrls={projectURLs} />}

          <h3>THE SOLUTION</h3>

          {contentURL && <ContentComponent title={null} content={contentURL} />}
        </div>
      }
    </>
  );
}

export default TheSolution;
