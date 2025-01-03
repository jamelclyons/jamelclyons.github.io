import React from 'react';

import CheckList from './CheckList';
import Gallery from '../Gallery';
import ContentComponent from '../ContentComponent';

import ProjectDelivery from '../../../model/ProjectDelivery';

interface DeliveryProps {
  delivery: ProjectDelivery;
}

const Delivery: React.FC<DeliveryProps> = ({ delivery }) => {
  const { checkList, gallery, content } = delivery;

  return (
    <>
      {!delivery.isEmpty &&
        <div className="project-process-delivery" id="project_process_delivery">
          <h4 className="title">delivery</h4>

          <CheckList checkList={checkList} />

          <Gallery gallery={gallery} title='' />

          <ContentComponent content={content} />
        </div>
      }
    </>
  );
}

export default Delivery;
