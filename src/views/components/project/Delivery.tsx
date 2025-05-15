import React, { useEffect, useState } from 'react';

import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';
import CheckListComponent from './CheckListComponent';

import Project from '@/model/Project';
import ContentURL from '@/model/ContentURL';
import Gallery from '@/model/Gallery';
import CheckList from '@/model/CheckList';
import ProjectQuery from '@/model/ProjectQuery';

interface DeliveryProps {
  project: Project;
}

const Delivery: React.FC<DeliveryProps> = ({ project }) => {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

  useEffect(() => {
    if (project.process && project.process.delivery
      && project.process.delivery.gallery) {
      setGallery(project.process.delivery.gallery)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.delivery
      && project.process.delivery.contentURL
      && project.process.delivery.contentURL.path === 'Delivery.md') {
      setContent(project.process.delivery.contentURL)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.delivery
      && project.process.delivery.checkList) {
      setCheckList(project.process.delivery.checkList)
    }
  }, [project]);

  useEffect(() => {
    if (project.query) {
      setQuery(project.query)
    }
  }, [project]);

  const hasContent = gallery || content || (checkList && query);

  return (hasContent && (
    <div className="project-process-delivery" id="project_process_delivery">
      <h3 className="title">delivery</h3>

      {gallery && gallery.images && gallery.images.length > 0 &&
        <GalleryComponent gallery={gallery.images} title="" />}

      {content &&
        <ContentComponent title={null} content={content} />}

      {checkList && query &&
        <CheckListComponent checkList={checkList} query={query} />}
    </div>
  )
  );
};

export default Delivery;