import React from 'react';

import CheckList from './CheckList';
import Gallery from '../Gallery';
import ContentComponent from '../content/ContentComponent';

import ProjectDelivery from '@/model/ProjectDelivery';

interface DeliveryProps {
  delivery: ProjectDelivery;
}

const Delivery: React.FC<DeliveryProps> = ({ delivery }) => {
  if (!delivery) return null;

  const { checkList, gallery, contentURL } = delivery;
  
  const hasContent = checkList.length > 0 || gallery?.images.length > 0 || contentURL;

  return (
    hasContent && (
      <div className="project-process-delivery" id="project_process_delivery">
        <h4 className="title">delivery</h4>

        {checkList.length > 0 && <CheckList checkList={checkList} />}

        {gallery.images.length > 0 && <Gallery gallery={gallery.images} title="" />}
        
        {contentURL && <ContentComponent title={null} url={contentURL} />}
      </div>
    )
  );
};

export default Delivery;