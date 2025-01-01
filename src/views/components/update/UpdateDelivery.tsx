import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectDelivery from '../../../model/ProjectDelivery';

const UpdateDelivery: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [deliveryGallery, setDeliveryGallery] = useState([]);
  const [deliveryCheckList, setDeliveryCheckList] = useState([]);

  const deliveryData = {
    delivery_gallery: deliveryGallery,
    delivery_check_list: deliveryCheckList,
  };

  const delivery = new ProjectDelivery(deliveryData);

  return (
    <>
      <h2 className="title">delivery</h2>

      <form action="">

        <button onClick={handleUpdateSolution}>
          <h3>update</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateDelivery