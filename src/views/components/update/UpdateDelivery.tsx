import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectDelivery, { ProjectDeliveryObject } from '@/model/ProjectDelivery';
import Project, { ProjectObject } from '@/model/Project';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';

import { updateProject } from '@/controllers/updateSlice';

interface UpdateDeliveryProps {
  projectObject: ProjectObject;
}

const UpdateDelivery: React.FC<UpdateDeliveryProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [delivery, setDelivery] = useState<ProjectDeliveryObject>(projectObject.process.delivery);
  const [gallery, setGallery] = useState(delivery.gallery);
  const [checkList, setCheckList] = useState(delivery.check_list);
  const [content, setContent] = useState(delivery.content_url);

  const handleUpdateDelivery = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      let updatedDeliveryObject: ProjectDeliveryObject = {
        check_list: checkList,
        gallery: gallery,
        content_url: content
      };

      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        process: {
          ...projectObject.process,
          delivery: updatedDeliveryObject
        }
      };

      dispatch(updateProject(new Project(updatedProjectObject)));
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