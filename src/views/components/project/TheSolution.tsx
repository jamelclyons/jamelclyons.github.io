import React, { useEffect, useState } from 'react';

import ProjectSolution from '@/model/ProjectSolution';

import FeaturesComponent from './Features';
import ProjectURLsComponent from './ProjectURLsComponent';
import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';
import Feature from '@/model/Feature';
import ProjectURLs from '@/model/ProjectURLs';
import Gallery from '@/model/Gallery';
import ContentURL from '@/model/ContentURL';

interface SolutionProps {
  solution: ProjectSolution
}

const TheSolution: React.FC<SolutionProps> = ({ solution }) => {
  const [features, setFeatures] = useState<Set<Feature> | null>(null);
  const [projectURLs, setProjectURLs] = useState<ProjectURLs | null>(null);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentURL, setContentURL] = useState<ContentURL | null>(null);

  useEffect(() => { if (solution.features) { setFeatures(solution.features) } }, [solution, setFeatures]);

  useEffect(() => { if (solution.projectURLs) { setProjectURLs(solution.projectURLs) } }, [solution, setProjectURLs]);

  useEffect(() => { if (solution.gallery) { setGallery(solution.gallery) } }, [solution, setGallery]);

  useEffect(() => { if (solution.contentURL) { setContentURL(solution.contentURL) } }, [solution, setContentURL]);

  const hasContent = features || projectURLs || gallery || contentURL;

  return (
    <>
      {hasContent &&
        <div className="project-section project-solution" id="project_solution">
          <h2>THE SOLUTION</h2>

          {gallery && gallery.images && gallery.images.length > 0 && <GalleryComponent gallery={gallery.images} title='' />}

          {features && features.size > 0 && <FeaturesComponent features={features} />}

          {projectURLs && <ProjectURLsComponent projectUrls={projectURLs} />}

          {contentURL && <ContentComponent title={null} content={contentURL} />}
        </div>
      }
    </>
  );
}

export default TheSolution;
