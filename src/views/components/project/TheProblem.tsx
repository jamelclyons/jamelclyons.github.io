import React from 'react';

import Gallery from '../Gallery';
import DocumentComponent from '@/views/components/DocumentComponent';
import ProjectProblem from '@/model/ProjectProblem';

interface ProblemProps {
  problem: ProjectProblem
}

const TheProblem: React.FC<ProblemProps> = ({ problem }) => {
  const { gallery, whitepaperURL } = problem;

  const hasContent = gallery.images.length > 0 || whitepaperURL;

  return (
    <>
      {hasContent &&
        <div className="project-section project-problem" id="project_problem">
          <h2 className="title">the problem</h2>

          <Gallery title={'Problem'} gallery={gallery.images} />

          {whitepaperURL && <DocumentComponent documentURL={whitepaperURL} />}
        </div>
      }
    </>
  );
}

export default TheProblem;
