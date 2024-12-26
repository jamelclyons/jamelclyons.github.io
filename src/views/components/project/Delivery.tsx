import React from 'react';

import CheckList from './CheckList';
import Gallery from '../Gallery';
import ContentComponent from '../ContentComponent';

import ProjectDelivery from '../../../model/ProjectDelivery';

interface DeliveryProps {
  delivery: ProjectDelivery;
}

const Delivery: React.FC<DeliveryProps> = ({ delivery }) => {

  return (
    <>
      <div className="project-process-delivery" id="project_process_delivery">
        <h4 className="title">delivery</h4>

        <CheckList checkList={delivery?.checkList} />

        <Gallery gallery={delivery?.gallery} />

        <ContentComponent content={delivery?.content} />
      </div>
    </>
  );
}

export default Delivery;
