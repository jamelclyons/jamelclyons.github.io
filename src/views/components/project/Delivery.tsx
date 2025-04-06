import React, { useEffect, useState } from 'react';

import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';
import CheckListComponent from './CheckListComponent';

import ProjectDelivery from '@/model/ProjectDelivery';
import Gallery from '@/model/Gallery';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';

interface DeliveryProps {
  delivery: ProjectDelivery;
}

const Delivery: React.FC<DeliveryProps> = ({ delivery }) => {
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentURL, setContentURL] = useState<ContentURL | null>(null);

  useEffect(() => {
    setCheckList(delivery.checkList);
  }, [delivery, setCheckList]);

  useEffect(() => {
    setGallery(delivery.gallery);
  }, [delivery, setGallery]);

  useEffect(() => {
    setContentURL(delivery.contentURL);
  }, [delivery, setContentURL]);

  const hasContent = checkList || gallery || contentURL;

  return (
    hasContent && (
      <div className="project-process-delivery" id="project_process_delivery">
        <h3 className="title">delivery</h3>

        {checkList && <CheckListComponent checkList={checkList} />}

        {gallery && gallery.images && gallery.images.length > 0 && <GalleryComponent gallery={gallery.images} title="" />}

        {contentURL && <ContentComponent title={null} content={contentURL} />}
      </div>
    )
  );
};

export default Delivery;