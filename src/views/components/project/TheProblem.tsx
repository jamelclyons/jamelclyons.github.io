import React, { useEffect, useState } from 'react';

import GalleryComponent from '../GalleryComponent';
import DocumentComponent from '@/views/components/DocumentComponent';
import ContentComponent from '../content/ContentComponent';

import ProjectProblem from '@/model/ProjectProblem';
import Gallery from '@/model/Gallery';
import ContentURL from '@/model/ContentURL';
import DocumentURL from '@/model/DocumentURL';

interface ProblemProps {
  problem: ProjectProblem
}

const TheProblem: React.FC<ProblemProps> = ({ problem }) => {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentURL, setContentURL] = useState<ContentURL | null>(null);
  const [whitepaperURL, setwhitepaperURL] = useState<DocumentURL | null>(null);

  useEffect(() => { if (problem.gallery) { setGallery(problem.gallery) } }, [problem, setGallery]);

  useEffect(() => { if (problem.contentURL) { setContentURL(problem.contentURL) } }, [problem, setContentURL]);

  useEffect(() => { if (problem.whitepaperURL) { setwhitepaperURL(problem.whitepaperURL) } }, [problem, setwhitepaperURL]);

  const hasContent = gallery || contentURL || whitepaperURL;

  return (
    <>
      {hasContent &&
        <>
          <div className="project-section project-problem" id="project_problem">
            <h2 className="title">the problem</h2>

            {gallery && gallery.images && gallery.images.length > 0 && < GalleryComponent title={'Problem'} gallery={gallery.images} />}

            {contentURL && <ContentComponent title='' content={contentURL} />}
          </div>

          {whitepaperURL && <DocumentComponent documentURL={whitepaperURL} />}
        </>
      }
    </>
  );
}

export default TheProblem;
