import React, { useEffect, useState } from 'react';

import CheckListComponent from './CheckListComponent';
import Colors from './Colors';
import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';

import Project from '@/model/Project';
import ContentURL from '@/model/ContentURL';

interface DesignProps {
  project: Project;
}

const Design: React.FC<DesignProps> = ({ project }) => {
  const hasContent = project.process && project.process.design && (project.process?.design?.checkList || project.process?.design?.colorsList || project.process?.design?.gallery || project.process?.design?.contentURL);
  const [content, setContent] = useState<ContentURL | null>(null);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.contentURL
      && project.process.design.contentURL.path === 'Design.md') {
      setContent(project.process.design.contentURL)
    }
  }, [project]);

  return (
    <>
      {project.process && project.process.design && hasContent &&
        <div className="project-process-design" id="project_process_design">
          <h3 className="title">design</h3>

          {project.process.design.checkList && project.query &&
            <CheckListComponent checkList={project.process.design.checkList} query={project.query} />}

          {project.process.design.colorsList && project.process.design.colorsList.length > 0 &&
            <Colors colors={project.process.design.colorsList} />}

          {project.process.design.gallery && project.process.design.gallery.logos && project.process.design.gallery.logos.length > 0 &&
            <GalleryComponent title={'Logos'} gallery={project.process.design.gallery.logos} />}

          {project.process.design.gallery && project.process.design.gallery.icons && project.process.design.gallery.icons.length > 0 &&
            <GalleryComponent title={'icons'} gallery={project.process.design.gallery.icons} />}

          {project.process.design.gallery && project.process.design.gallery.animations && project.process.design.gallery.animations.length > 0 &&
            <GalleryComponent title={'animations'} gallery={project.process.design.gallery.animations} />}

          {project.process.design.gallery && project.process.design.gallery.umlDiagrams && project.process.design.gallery.umlDiagrams.length > 0 &&
            <GalleryComponent title={'uml diagrams'} gallery={project.process.design.gallery.umlDiagrams} />}

          {content &&
            <ContentComponent title={null} content={content} />}
        </div>
      }
    </>
  );
}

export default Design;
