import React, { useEffect, useState } from 'react';

import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';
import CheckListComponent from './CheckListComponent';

import Project from '@/model/Project';
import ContentURL from '@/model/ContentURL';

interface DeliveryProps {
  project: Project;
}

const Delivery: React.FC<DeliveryProps> = ({ project }) => {
  const hasContent = project.process && project.process.delivery && (project.process.delivery.checkList || project.process.delivery.gallery || project.process.delivery.contentURL);
  const [content, setContent] = useState<ContentURL | null>(null);

  useEffect(() => {
    if (project.process && project.process.delivery
      && project.process.delivery.contentURL
      && project.process.delivery.contentURL.path === 'Delivery.md') {
      setContent(project.process.delivery.contentURL)
    }
  }, [project]);

  return (
    project.process &&
    project.process.delivery &&
    hasContent && (
      <div className="project-process-delivery" id="project_process_delivery">
        <h3 className="title">delivery</h3>

        {project.process.delivery.checkList && project.query &&
          <CheckListComponent checkList={project.process.delivery.checkList} query={project.query} />}

        {project.process.delivery.gallery && project.process.delivery.gallery.images && project.process.delivery.gallery.images.length > 0 &&
          <GalleryComponent gallery={project.process.delivery.gallery.images} title="" />}

        {content &&
          <ContentComponent title={null} content={content} />}
      </div>
    )
  );
};

export default Delivery;