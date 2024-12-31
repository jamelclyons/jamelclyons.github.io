import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectDesign from '../../../model/ProjectDesign';

function UpdateDesign() {
  const dispatch = useDispatch<AppDispatch>();

  const [designCheckList, setDesignCheckList] = useState([]);
  const [designGallery, setDesignGallery] = useState([]);
  const [colorsList, setColorsList] = useState([]);

  const designData = {
    design_check_list: designCheckList,
    design_gallery: designGallery,
    colors_list: colorsList,
  };

  const design = new ProjectDesign(designData);

  return (
    <div>UpdateDesign</div>
  )
}

export default UpdateDesign