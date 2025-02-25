import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../../model/store';
import { ProjectDesignObject } from '../../../../model/ProjectDesign';
import Project, { ProjectObject } from '@/model/Project';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../../controllers/messageSlice';

import { updateProject } from '../../../../controllers/updateSlice';

import UpdateCheckList from '../components/UpdateCheckList';
import UpdateGallery from '../components/UpdateGallery';
import UpdateColorsList from '../components/UpdateColorsList';

interface UpdateDesignProps {
  projectObject: ProjectObject;
}

const UpdateDesign: React.FC<UpdateDesignProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [design, setDesign] = useState<ProjectDesignObject>(projectObject.process.design);
  const [checkList, setCheckList] = useState(projectObject.process.design.check_list);
  const [gallery, setGallery] = useState(projectObject.process.design.gallery);
  const [colorsList, setColorsList] = useState(projectObject.process.design.colors_list);
  const [contentURL, setContentURL] = useState(projectObject.process.design.content_url);

  useEffect(() => {
    setDesign(projectObject.process.design)
  }, [projectObject.process.design, setDesign]);

  useEffect(() => { setCheckList(design.check_list) }, [design.check_list, setCheckList]);

  useEffect(() => { setGallery(design.gallery) }, [design.gallery, setGallery]);

  useEffect(() => { setColorsList(design.colors_list) }, [design.colors_list, setColorsList]);

  const handleDesignContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'design_content_url') {
      setContentURL(value)

      setDesign({
        gallery: gallery,
        check_list: checkList,
        colors_list: colorsList,
        content_url: value
      })
    }
  }

  const handleUpdateDesign = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const projectDesignObject: ProjectDesignObject = {
        gallery: gallery,
        check_list: checkList,
        colors_list: colorsList,
        content_url: contentURL
      };

      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        process: {
          ...projectObject.process,
          design: projectDesignObject
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

  return (<>
    <h2 className="title">design</h2>

    <UpdateCheckList checkList={checkList} />

    <UpdateGallery gallery={gallery} />

    <UpdateColorsList colors={colorsList} />

    <div className="form-item-flex">
      <label htmlFor="design_content_url">Design Content URL:</label>
      <input type="text" name='design_content_url' value={contentURL ?? ''} onChange={handleDesignContentURLChange} />
    </div>

    <button onClick={handleUpdateDesign}>
      <h3>Update Design</h3>
    </button>
  </>
  )
}

export default UpdateDesign