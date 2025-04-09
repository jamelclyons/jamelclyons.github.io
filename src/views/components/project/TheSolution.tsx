import React from 'react';

import FeaturesComponent from './Features';
import ProjectURLsComponent from './ProjectURLsComponent';
import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';

import Project from '@/model/Project';
import Version from '@/model/Version';

interface SolutionProps {
  project: Project
}

const TheSolution: React.FC<SolutionProps> = ({ project }) => {
  const hasContent = project.solution?.features || project.solution?.projectURLs || project.solution?.gallery || project.solution?.contentURL;

  return (
    <>
      {project.solution && hasContent &&
        <div className="project-section project-solution" id="project_solution">
          <h2>THE SOLUTION</h2>

          {project.solution && project.solution.gallery && project.solution.gallery.images && project.solution.gallery.images.length > 0 &&
            <GalleryComponent gallery={project.solution.gallery.images} title='' />}

          {project.solution && project.solution.features && project.solution.features.size > 0 && project.process && project.process.development && project.process.development.versionsList &&
            <FeaturesComponent features={project.solution.features} currentVersion={new Version(project.process.development.versionsList.current)} />}

          {project.solution && project.solution.projectURLs &&
            <ProjectURLsComponent projectUrls={project.solution.projectURLs} />}

          {project.solution && project.solution.contentURL &&
            <ContentComponent title={null} content={project.solution.contentURL} />}
        </div>
      }
    </>
  );
}

export default TheSolution;
