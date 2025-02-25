import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import { ProjectDeliveryObject } from '@/model/ProjectDelivery';
import Project, { ProjectObject } from '@/model/Project';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import UpdateGallery from '../components/UpdateGallery';
import { GalleryObject } from '@/model/Gallery';
import { TaskObject } from '@/model/Task';
import UpdateCheckList from '../components/UpdateCheckList';

interface UpdateDeliveryProps {
  projectObject: ProjectObject;
}

const UpdateDelivery: React.FC<UpdateDeliveryProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedGallery } = useSelector((state: RootState) => state.update);

  const [delivery, setDelivery] = useState<ProjectDeliveryObject>(projectObject.process.delivery);
  const [checkList, setCheckList] = useState<Array<TaskObject>>(projectObject.process.delivery.check_list);
  const [gallery, setGallery] = useState<GalleryObject>(projectObject.process.delivery.gallery);
  const [content, setContent] = useState<string>(projectObject.process.delivery.content_url);

  useEffect(() => {
    setDelivery(projectObject.process.delivery)
  }, [projectObject.process.delivery, setDelivery]);

  useEffect(() => {
    setGallery(delivery.gallery)
  }, [delivery.gallery, setGallery]);

  useEffect(() => {
    setCheckList(delivery.check_list)
  }, [delivery.check_list, setCheckList]);

  useEffect(() => {
    setContent(delivery.content_url)
  }, [delivery.content_url, setContent]);

  useEffect(() => {
    if (updatedGallery) {
      setGallery({ logos: updatedGallery?.logos ?? [], icons: updatedGallery?.logos ?? [], animations: updatedGallery?.animations ?? [], uml_diagrams: updatedGallery?.uml_diagrams ?? [] });
    }
  }, [updatedGallery, setGallery]);

  const handleUpdateDelivery = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedDeliveryObject: ProjectDeliveryObject = {
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

      <UpdateCheckList checkList={checkList} />

      <UpdateGallery gallery={gallery} />

      <div className="form-item-flex">
        <label htmlFor="delivery_content_url">
          Delivery Content URL:
        </label>
        <input type="text" name='delivery_content_url' value={content ?? ''} />
      </div>

      <button onClick={handleUpdateDelivery}>
        <h3>Update Delivery</h3>
      </button>
    </>
  )
}

export default UpdateDelivery