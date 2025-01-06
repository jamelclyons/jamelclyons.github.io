import React from 'react';

import Gallery from '../Gallery';
import ContentComponent from '../content/ContentComponent';
import ProjectProblem from '../../../model/ProjectProblem';

interface ProblemProps {
  problem: ProjectProblem
}

const TheProblem: React.FC<ProblemProps> = ({ problem }) => {
  const { gallery, content } = problem;

  return (
    <>
      {(gallery.images.length > 0 || (typeof content === 'string' && content !== '')) &&
        <div className="project-problem" id="project_problem">
          <h3 className="title">the problem</h3>

          <Gallery title={'Problem'} gallery={gallery.images} />

          {typeof content === 'string' && content !== '' && <ContentComponent html={content} />}
        </div>
      }
    </>
  );
}

export default TheProblem;
