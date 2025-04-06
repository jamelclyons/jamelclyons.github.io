import React from 'react';

import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';
import CheckListComponent from './CheckListComponent';

import Project from '@/model/Project';

interface DeliveryProps {
  project: Project;
}

const Delivery: React.FC<DeliveryProps> = ({ project }) => {
  const hasContent = project.process?.delivery?.checkList || project.process?.delivery?.gallery || project.process?.delivery?.contentURL;

  return (
    project.process &&
    project.process.delivery &&
    hasContent && (
      <div className="project-process-delivery" id="project_process_delivery">
        <h3 className="title">delivery</h3>

        {project.process.delivery.checkList &&
          <CheckListComponent checkList={project.process.delivery.checkList} />}

        {project.process.delivery.gallery && project.process.delivery.gallery.images && project.process.delivery.gallery.images.length > 0 &&
          <GalleryComponent gallery={project.process.delivery.gallery.images} title="" />}

        {project.process.delivery.contentURL && <ContentComponent title={null} content={project.process.delivery.contentURL} />}
      </div>
    )
  );
};

export default Delivery;