import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectProblem from '../../../model/ProjectProblem';

function UpdateProblem() {
  const dispatch = useDispatch<AppDispatch>();

  const [problemGallery, setProblemGallery] = useState([]);

  const problemData = {};

  const problem = new ProjectProblem(problemData);

  return (
    <div>UpdateProblem</div>
  )
}

export default UpdateProblem