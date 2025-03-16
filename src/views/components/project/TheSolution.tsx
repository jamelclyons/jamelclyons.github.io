import React from 'react';

import ProjectSolution from '@/model/ProjectSolution';

import FeaturesComponent from './Features';
import ProjectURLsComponent from './ProjectURLsComponent';
import GalleryComponent from '../Gallery';
import ContentComponent from '../content/ContentComponent';

interface SolutionProps {
  solution: ProjectSolution
}

const TheSolution: React.FC<SolutionProps> = ({ solution }) => {
  const { features, projectURLs, gallery, contentURL } = solution;

  const hasContent = features.size > 0 ||
    (projectURLs.homepage.url || projectURLs.ios.url || projectURLs.android.url) ||
    gallery.images.length > 0 ||
    contentURL;

  return (
    <>
      {hasContent &&
        <div className="project-section project-solution" id="project_solution">
          <h2>THE SOLUTION</h2>

          {gallery.images.length > 0 && <GalleryComponent gallery={gallery.images} title='' />}

          {features.size > 0 && <FeaturesComponent features={features} />}

          {projectURLs && <ProjectURLsComponent projectUrls={projectURLs} />}

          {contentURL && <ContentComponent title={null} content={contentURL} />}
        </div>
      }
    </>
  );
}

export default TheSolution;
