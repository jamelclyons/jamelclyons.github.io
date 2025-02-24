import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectDesign, { ProjectDesignObject } from '../../../model/ProjectDesign';
import { ProjectObject } from '@/model/Project';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

import { updateDesign } from '../../../controllers/updateSlice';

import Gallery from '../../../model/Gallery';

interface UpdateDesignProps {
    projectObject: ProjectObject;
}

const UpdateDesign: React.FC<UpdateDesignProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [design, setDesign] = useState<ProjectDesignObject>(projectObject.process.design);

  const [gallery, setGallery] = useState(design.gallery);
  const [colorsList, setColorsList] = useState(design.colorsList);
  const [checkList, setCheckList] = useState(design.checkList);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     setGallery(new Gallery);
  //   } catch (error) {
  //     const err = error as Error;
  //     dispatch(setMessage(err.message));
  //     dispatch(setMessageType('error'));
  //   }
  // };

  const handleUpdateSolution = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const form = document.getElementById('update_design') as HTMLFormElement;
      const formData = new FormData(form);

      let designData: Record<string, any> = {};

      formData.forEach((value, key) => {
        designData[key] = value;
      });

      let data: Record<string, any> = {
        design: designData
      };

      dispatch(updateDesign(data));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (<>
    <h2 className="title">design</h2>

    <form action="" id='update_design'>

      <button onClick={handleUpdateSolution}>
        <h3>Update Design</h3>
      </button>
    </form>
  </>
  )
}

export default UpdateDesign