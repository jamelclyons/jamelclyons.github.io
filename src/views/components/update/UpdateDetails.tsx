import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

import { updateDetails } from '../../../controllers/updateSlice';

interface UpdateDetailsProps {
  projectID: string
}

const UpdateDetails: React.FC<UpdateDetailsProps> = ({ projectID }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { details } = useSelector(
    (state: RootState) => state.project
  );
  const { updateLoading, updateErrorMessage, updateSuccessMessage } = useSelector(
    (state: RootState) => state.update
  );

  useEffect(() => {
    if (updateLoading) {
      dispatch(setMessage('Standbye while an attempt to update the details section of your project is made.'));
      dispatch(setMessageType('info'));
    }
  }, [updateLoading, dispatch]);

  useEffect(() => {
    if (updateErrorMessage) {
      dispatch(setMessage(updateErrorMessage));
      dispatch(setMessageType('error'));
    }
  }, [updateErrorMessage, dispatch]);

  useEffect(() => {
    if (updateSuccessMessage) {
      dispatch(setMessage(updateSuccessMessage));
      dispatch(setMessageType('success'));
    }
  }, [updateSuccessMessage, dispatch]);

  const [detailsList, setDetailsList] = useState(details?.detailsList);
  const [teamList, setTeamList] = useState(details?.teamList);
  const [clientID, setClientID] = useState(details?.clientID);

  const handleChangeClientID = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'client_id') {
        setClientID([]);
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleUpdateDetails = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const form = document.getElementById('update_details') as HTMLFormElement;
      const formData = new FormData(form);

      let detailsData: Record<string, any> = {};

      formData.forEach((value, key) => {
        detailsData[key] = value;
      });

      let data: Record<string, any> = {
        id: projectID,
        details: detailsData
      };

      dispatch(updateDetails(data));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <>
      <h2 className='title'>Details</h2>

      <form action="" id='update_details'>
        <input type="number" value={status} placeholder="Progress # 0-100" onChange={handleChangeClientID} />

        <button onClick={handleUpdateDetails}>
          <h3>update</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateDetails