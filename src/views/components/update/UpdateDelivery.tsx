import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectDelivery from '@/model/ProjectDelivery';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';

import { updateDelivery } from '@/controllers/updateSlice';

interface UpdateDeliveryProps {
  projectID: string;
  projectDataObject: Record<string, any>;
}

const UpdateDelivery: React.FC<UpdateDeliveryProps> = ({ projectID, projectDataObject }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [delivery, setDelivery] = useState<ProjectDelivery>(new ProjectDelivery(projectDataObject?.delivery));
  const [gallery, setGallery] = useState(delivery.gallery);
  const [checkList, setCheckList] = useState(delivery?.checkList);
  // const [content, setContent] = useState(delivery?.checkList);

  const handleChangeGallery = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setGallery([]);
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleChangeCheckList = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setCheckList([]);
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  // const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     setContent([]);
  //   } catch (error) {
  //     const err = error as Error;
  //     dispatch(setMessage(err.message));
  //     dispatch(setMessageType('error'));
  //   }
  // };

  const handleUpdateDelivery = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const form = document.getElementById('update_delivery') as HTMLFormElement;
      const formData = new FormData(form);

      let deliveryData: Record<string, any> = {};

      formData.forEach((value, key) => {
        deliveryData[key] = value;
      });

      let data: Record<string, any> = {
        id: projectID,
        delivery: deliveryData
      };

      dispatch(updateDelivery(data));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <>
      <h2 className="title">delivery</h2>

      <form action="" id='update_delivery'>

        <button onClick={handleUpdateDelivery}>
          <h3>Update Delivery</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateDelivery