import React from 'react';

import CheckList from './CheckList';
import Gallery from '../Gallery';
import ContentComponent from '../content/ContentComponent';

import ProjectDelivery from '../../../model/ProjectDelivery';

interface DeliveryProps {
  delivery: ProjectDelivery;
}

const Delivery: React.FC<DeliveryProps> = ({ delivery }) => {
  const { checkList, gallery, content } = delivery;

  return (
    <>
      {checkList.length > 0 ||
        (typeof content === 'string' && content !== '') ||
        gallery.length > 0 &&
        <div className="project-process-delivery" id="project_process_delivery">
          <h4 className="title">delivery</h4>

          {checkList.length > 0 && <CheckList checkList={checkList} />}

          {gallery.length > 0 && <Gallery gallery={gallery} title='' />}

          {typeof content === 'string' && content !== '' && <ContentComponent html={content} />}
        </div>
      }
    </>
  );
}

export default Delivery;
