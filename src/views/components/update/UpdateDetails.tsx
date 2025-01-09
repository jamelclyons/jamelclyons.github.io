import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectDetails from '../../../model/ProjectDetails';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';
import { updateDetails } from '../../../controllers/updateSlice';
import { Privacy, privacyFromString } from '../../../model/enum/Enums';

interface UpdateDetailsProps {
  projectID: string;
  details: ProjectDetails;
}

const UpdateDetails: React.FC<UpdateDetailsProps> = ({ projectID, details }) => {
  const dispatch = useDispatch<AppDispatch>();

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

  const [privacy, setPrivacy] = useState(details.privacy);
  const [clientID, setClientID] = useState(details.clientID);
  const [clientName, setClientName] = useState(details.clientName);
  const [startDate, setStartDate] = useState(details.startDate);
  const [endDate, setEndDate] = useState(details.endDate);
  const [teamList, setTeamList] = useState(details.teamList);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const target = e.target;

      const { name, value } = target;

      if (name === 'privacy') {
        setPrivacy(privacyFromString(value));
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target;
      const { name, value } = target;

      if (name === 'client_id') {
        setClientID(value);
      }

      if (name === 'client_name') {
        setClientName(value);
      }

      if (name === 'start_date') {
        setStartDate(value);
      }

      if (name === 'end_date') {
        setEndDate(value);
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

      const details = new ProjectDetails(detailsData);

      let data: Record<string, any> = {
        id: projectID,
        details: details.toObject()
      };

      console.log(data)
      // dispatch(updateDetails(data));
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
        <label htmlFor="privacy">Privacy:</label>
        {privacy && <p>Current Privacy Setting: {privacy.toString().charAt(0).toUpperCase() + privacy.toString().slice(1)}</p>}
        <select id="privacy" name='privacy' value={privacy} onChange={handleChangeSelect}>
          <option value={Privacy.Private}>Private</option>
          <option value={Privacy.Public}>Public</option>
        </select>

        <label htmlFor="client_id">Client ID:</label>
        <input type="text" id='client_id' name='client_id' value={clientID} onChange={handleChange} />

        <label htmlFor="client_name">Client Name:</label>
        <input type="text" id='client_name' name='client_name' value={clientName} onChange={handleChange} />

        <label htmlFor="start_date">Start Date:</label>
        <input type="date" id="start_date" name="start_date" value={startDate} min="2010-06-16" onChange={handleChange} />

        <label htmlFor="end_date">End Date:</label>
        <input type="date" id="end_date" name="end_date" value={endDate} min="2010-06-16" onChange={handleChange} />

        <button onClick={handleUpdateDetails}>
          <h3>update</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateDetails