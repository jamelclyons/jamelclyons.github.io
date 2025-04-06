import React, { useEffect, useState } from 'react';

import GalleryComponent from '../GalleryComponent';
import DocumentComponent from '@/views/components/DocumentComponent';
import ContentComponent from '../content/ContentComponent';

import Gallery from '@/model/Gallery';
import ContentURL from '@/model/ContentURL';
import DocumentURL from '@/model/DocumentURL';
import Project from '@/model/Project';

interface ProblemProps {
  project: Project;
}

const TheProblem: React.FC<ProblemProps> = ({ project }) => {
  const hasContent = project.problem?.gallery || project.problem?.contentURL || project.problem?.whitepaperURL;

  return (
    <>
      {project.problem && hasContent &&
        <>
          <div className="project-section project-problem" id="project_problem">
            <h2 className="title">the problem</h2>

            {project.problem.gallery && project.problem.gallery.images && project.problem.gallery.images.length > 0 && < GalleryComponent title={'Problem'} gallery={project.problem.gallery.images} />}

            {project.problem.contentURL && <ContentComponent title='' content={project.problem.contentURL} />}
          </div>

          {project.problem && project.problem.whitepaperURL && <DocumentComponent documentURL={project.problem.whitepaperURL} />}
        </>
      }
    </>
  );
}

export default TheProblem;
