import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../../model/store';
import ProjectDesign, { ProjectDesignObject } from '../../../../model/ProjectDesign';
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
import Gallery, { GalleryObject } from '@/model/Gallery';
import CheckList, { CheckListObject } from '@/model/CheckList';
import Color from '@/model/Color';

interface UpdateDesignProps {
  project: Project;
}

const UpdateDesign: React.FC<UpdateDesignProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedDesignGallery, updatedDesignCheckList, updatedColors } = useSelector(
    (state: RootState) => state.update
  );

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [design, setDesign] = useState<ProjectDesign>(project.process.design);
  const [gallery, setGallery] = useState<Gallery>(project.process.design.gallery);
  const [checkList, setCheckList] = useState<CheckList>(project.process.design.checkList);
  const [colorsList, setColorsList] = useState<Array<Color>>(project.process.design.colorsList);
  const [contentURL, setContentURL] = useState<string>(project.process.design.contentURL);

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setDesign(project.process.design)
  }, [project.process.design, setDesign]);

  useEffect(() => { setCheckList(design.checkList) }, [design.checkList, setCheckList]);

  useEffect(() => { setGallery(design.gallery) }, [design.gallery, setGallery]);

  useEffect(() => { setColorsList(design.colorsList) }, [design.colorsList, setColorsList]);

  useEffect(() => {
    if (updatedDesignGallery) {
      setGallery(new Gallery(updatedDesignGallery))
    }
  }, [updatedDesignGallery, setGallery]);

  useEffect(() => {
    if (updatedDesignCheckList) {
      setCheckList(new CheckList(updatedDesignCheckList))
    }
  }, [updatedDesignCheckList, setCheckList]);

  useEffect(() => {
    if (updatedColors) {
      setColorsList(updatedColors.map((color) => new Color(color)))
    }
  }, [updatedColors, setColorsList]);

  const handleDesignContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'design_content_url') {
      setContentURL(value)

      setDesign(new ProjectDesign({
        gallery: gallery,
        check_list: checkList,
        colors_list: colorsList,
        content_url: value
      }))
    }
  }

  const handleUpdateDesign = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const projectDesignObject: ProjectDesignObject = {
        gallery: gallery.toGalleryObject(),
        check_list: checkList.toCheckListObject(),
        colors_list: colorsList.map((color) => color.toColorObject()),
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

  return (
    <div className='update' id='update_design'>
      <h2 className="title">design</h2>

      <UpdateCheckList location='design' checkList={checkList} />

      <br />

      <UpdateGallery location='design' gallery={gallery} />

      <br />

      <UpdateColorsList colorsObject={colorsList} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="design_content_url">Design Content URL:</label>
        <input type="text" name='design_content_url' value={contentURL ?? ''} onChange={handleDesignContentURLChange} />
      </div>

      <button onClick={handleUpdateDesign}>
        <h3>Update Design</h3>
      </button>
    </div>
  )
}

export default UpdateDesign