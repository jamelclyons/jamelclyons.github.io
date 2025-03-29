import React from 'react';

import Gallery from '../Gallery';
import DocumentComponent from '@/views/components/DocumentComponent';
import ProjectProblem from '@/model/ProjectProblem';
import ContentComponent from '../content/ContentComponent';

interface ProblemProps {
  problem: ProjectProblem
}

const TheProblem: React.FC<ProblemProps> = ({ problem }) => {
  const { gallery, contentURL, whitepaperURL } = problem;

  const hasContent = gallery.images.length > 0 || contentURL && contentURL.url || whitepaperURL && whitepaperURL.url;

  return (
    <>
      {hasContent &&
        <>
          <div className="project-section project-problem" id="project_problem">
            <h2 className="title">the problem</h2>

            <Gallery title={'Problem'} gallery={gallery.images} />

            {contentURL && <ContentComponent title='' content={contentURL} />}

          </div>

          {whitepaperURL && <DocumentComponent documentURL={whitepaperURL} />}
        </>
      }
    </>
  );
}

export default TheProblem;
