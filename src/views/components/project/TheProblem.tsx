import React from 'react';

import Gallery from '../Gallery';
import ContentComponent from '../ContentComponent';
import ProjectProblem from '../../../model/ProjectProblem';

interface ProblemProps {
  problem: ProjectProblem
}

const TheProblem: React.FC<ProblemProps> = ({ problem }) => {

  return (
    <>
    {!problem.isEmpty() }
      <div className="project-problem" id="project_problem">
        <h3 className="title">the problem</h3>

        <Gallery title={'Problem'} gallery={problem?.gallery} />

        <ContentComponent content={problem?.content} />
      </div>
    </>
  );
}

export default TheProblem;
