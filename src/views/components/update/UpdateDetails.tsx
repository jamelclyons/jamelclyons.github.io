import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectDetails from '../../../model/ProjectDetails';

const UpdateDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [detailsList, setDetailsList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [clientID, setClientID] = useState('');

  const detailsData = {};

  const details = new ProjectDetails(detailsData);

  return (
    <h2 className='title'>Details</h2>
  )
}

export default UpdateDetails