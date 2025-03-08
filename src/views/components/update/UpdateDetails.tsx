import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/model/store';
import Project, { ProjectObject } from '@/model/Project';
import ProjectDetails, { ProjectDetailsObject } from '@/model/ProjectDetails';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import { Privacy, privacyFromString } from '@/model/enum/Enums';

interface UpdateDetailsProps {
  project: Project;
}

const UpdateDetails: React.FC<UpdateDetailsProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [details, setDetails] = useState<ProjectDetails>(project.details);
  const [privacy, setPrivacy] = useState<string>(details.privacy);
  const [clientID, setClientID] = useState<string>(details.clientID);
  const [clientName, setClientName] = useState<string>(details.clientName);
  const [startDate, setStartDate] = useState<string>(details.startDate ?? '');
  const [endDate, setEndDate] = useState<string>(details.endDate ?? '');

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setDetails(project.details);
    setPrivacy(project.details.privacy)
    setClientID(project.details.clientID)
    setClientName(project.details.clientName)
    setStartDate(project.details.startDate ?? '')
    setEndDate(project.details.endDate ?? '')
  }, [
    project.details,
    setDetails,
    setPrivacy,
    setClientID,
    setClientName,
    setStartDate,
    setEndDate
  ]);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const target = e.target;

      const { name, value } = target;

      if (name === 'privacy') {
        setPrivacy(privacyFromString(value));
      }

      setDetails(new ProjectDetails({ ...details.toDetailsObject(), privacy: privacy }));
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

      const detailsObject: ProjectDetailsObject = {
        ...details.toDetailsObject(),
        client_id: clientID,
        client_name: clientName,
        start_date: startDate,
        end_date: endDate
      };

      setDetails(new ProjectDetails(detailsObject));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleUpdateDetails = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const detailsObject: ProjectDetailsObject = {
        privacy: privacy,
        client_id: clientID,
        client_name: clientName,
        start_date: startDate,
        end_date: endDate,
        content: '',
        team_list: []
      };

      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        details: detailsObject
      }

      dispatch(updateProject(new Project(updatedProjectObject)));
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
        <div className="form-item-flex">
          <label htmlFor="privacy">Privacy:</label>
          <select id="privacy" name='privacy' value={privacy} onChange={handleChangeSelect}>
            <option value={Privacy.Private}>Private</option>
            <option value={Privacy.Public}>Public</option>
          </select>
        </div>

        <div className="form-item-flex">
          <label htmlFor="client_id">Client ID:</label>
          <input type="text" id='client_id' name='client_id' value={clientID ?? ''} onChange={handleChange} />
        </div>

        <div className="form-item-flex">
          <label htmlFor="client_name">Client Name:</label>
          <input type="text" id='client_name' name='client_name' value={clientName ?? ''} onChange={handleChange} />
        </div>

        <div className="form-item-flex">
          <label htmlFor="start_date">Start Date:</label>
          <input type="date" id="start_date" name="start_date" value={startDate ?? ''} min="2010-06-16" onChange={handleChange} />
        </div>

        <div className="form-item-flex">
          <label htmlFor="end_date">End Date:</label>
          <input type="date" id="end_date" name="end_date" value={endDate ?? ''} min="2010-06-16" onChange={handleChange} />
        </div>

        <button onClick={handleUpdateDetails}>
          <h3>UPDATE DETAILS</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateDetails