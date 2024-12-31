import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectSolution from '../../../model/ProjectSolution';

const UpdateSolution: React.FC = () => {
  const [solutionGallery, setSolutionGallery] = useState([]);
  const [urlsList, setUrlsList] = useState([]);

  const solutionData = {
    solution_gallery: solutionGallery,
  };

  const solution = new ProjectSolution(solutionData);

  return (
    <h1 className="title">solution</h1>)
}

export default UpdateSolution