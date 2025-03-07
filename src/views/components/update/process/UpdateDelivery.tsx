import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
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

import UpdateGallery from '../components/UpdateGallery';
import Gallery from '@/model/Gallery';
import UpdateCheckList from '../components/UpdateCheckList';
import CheckList from '@/model/CheckList';

interface UpdateDeliveryProps {
  project: Project;
}

const UpdateDelivery: React.FC<UpdateDeliveryProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedDeliveryGallery, updatedDeliveryCheckList } = useSelector((state: RootState) => state.update);

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [delivery, setDelivery] = useState<ProjectDelivery>(project.process.delivery);
  const [gallery, setGallery] = useState<Gallery>(project.process.delivery.gallery);
  const [checkList, setCheckList] = useState<CheckList>(project.process.delivery.checkList);
  const [content, setContent] = useState<string>(project.process.delivery.contentURL);

  useEffect(() => { setProjectObject(project.toProjectObject()) }, [project, setProjectObject]);

  useEffect(() => {
    setDelivery(project.process.delivery)
  }, [project.process.delivery, setDelivery]);

  useEffect(() => {
    setGallery(delivery.gallery)
  }, [delivery.gallery, setGallery]);

  useEffect(() => {
    setCheckList(delivery.checkList)
  }, [delivery.checkList, setCheckList]);

  useEffect(() => {
    setContent(delivery.contentURL)
  }, [delivery.contentURL, setContent]);

  useEffect(() => {
    if (updatedDeliveryCheckList) {
      setCheckList(new CheckList(updatedDeliveryCheckList));
    }
  }, [updatedDeliveryCheckList, setCheckList]);

  useEffect(() => {
    if (updatedDeliveryGallery) {
      setGallery(new Gallery(updatedDeliveryGallery));
    }
  }, [updatedDeliveryGallery, setGallery]);

  const handleDeliveryContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'delivery_content_url') {
        setContent(value);

        setDelivery(new ProjectDelivery({
          check_list: checkList,
          gallery: gallery,
          content_url: content
        }));
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleUpdateDelivery = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedDeliveryObject: ProjectDeliveryObject = {
        check_list: checkList.toCheckListObject(),
        gallery: gallery.toGalleryObject(),
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
    <div className="update" id="update_delivery">

      <h2 className="title">delivery</h2>

      <UpdateCheckList location='delivery' checkList={checkList} />

      <br />

      <UpdateGallery location='delivery' gallery={gallery} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="delivery_content_url">
          Delivery Content URL:
        </label>
        <input type="text" name='delivery_content_url' value={content ?? ''} onChange={handleDeliveryContentURLChange} />
      </div>

      <button onClick={handleUpdateDelivery}>
        <h3>Update Delivery</h3>
      </button>
    </div>
  )
}

export default UpdateDelivery