import React, { useEffect, useState } from 'react';

import FeaturesComponent from './Features';
import ProjectURLsComponent from './ProjectURLsComponent';
import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';

import Project from '@/model/Project';
import Version from '@/model/Version';
import ContentURL from '@/model/ContentURL';

interface SolutionProps {
  project: Project
}

const TheSolution: React.FC<SolutionProps> = ({ project }) => {
  const hasContent = project.solution && project.solution?.features || project.solution?.projectURLs || project.solution?.gallery || project.solution?.contentURL;
  const [content, setContent] = useState<ContentURL | null>(null);

  useEffect(() => {
    if (project.solution && project.solution.contentURL && project.solution.contentURL.path === 'TheSolution.md') {
      setContent(project.solution.contentURL)
    }
  }, [project]);

  return (
    <>
      {project.solution && hasContent &&
        <div className="project-section project-solution" id="project_solution">
          <h2>THE SOLUTION</h2>

          {project.solution.gallery && project.solution.gallery.images && project.solution.gallery.images.length > 0 &&
            <GalleryComponent gallery={project.solution.gallery.images} title='' />}

          {project.solution.features && project.solution.features.size > 0 && project.process && project.process.development && project.process.development.versionsList &&
            <FeaturesComponent features={project.solution.features} currentVersion={new Version(project.process.development.versionsList.current)} />}

          {project.solution.projectURLs &&
            <ProjectURLsComponent projectUrls={project.solution.projectURLs} />}

          {content &&
            <ContentComponent title={null} content={content} />}
        </div>
      }
    </>
  );
}

export default TheSolution;
