import React, { useEffect, useState } from 'react';

import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';

import DocumentComponent from '@/views/components/DocumentComponent';

import Project from '@/model/Project';
import ContentURL from '@/model/ContentURL';

interface ProblemProps {
  project: Project;
}

const TheProblem: React.FC<ProblemProps> = ({ project }) => {
  const hasContent = project.problem && (project.problem.gallery || project.problem.contentURL || project.problem.whitepaperURL);
  const [content, setContent] = useState<ContentURL | null>(null);

  useEffect(() => {
    if (project.problem && project.problem.contentURL && project.problem.contentURL.path === 'TheProblem.md') {
      setContent(project.problem.contentURL)
    }
  }, [project]);

  return (
    <>
      {project.problem && hasContent &&
        <>
          <div className="project-section project-problem" id="project_problem">
            <h2 className="title">the problem</h2>

            {project.problem.gallery && project.problem.gallery.images && project.problem.gallery.images.length > 0 && < GalleryComponent title={'Problem'} gallery={project.problem.gallery.images} />}

            {content && <ContentComponent title='' content={content} />}
          </div>

          {project.problem && project.problem.whitepaperURL && <DocumentComponent documentURL={project.problem.whitepaperURL} />}
        </>
      }
    </>
  );
}

export default TheProblem;
