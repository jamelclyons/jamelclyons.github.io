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
import ContentURL, { ContentURLObject } from '@/model/ContentURL';

interface UpdateDetailsProps {
  project: Project;
}

const UpdateDetails: React.FC<UpdateDetailsProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [privacy, setPrivacy] = useState<string | null>(null);
  const [clientID, setClientID] = useState<string | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setDetails(project.details);
    setPrivacy(project.details?.privacy ?? null)
    setClientID(project.details?.clientID ?? null)
    setContent(project.details?.content ?? null)
  }, [
    project.details,
    setDetails,
    setPrivacy,
    setClientID,
    setContent
  ]);

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

      let contentObject: ContentURLObject | null = content ? content?.toContentURLObject() : null;

      if (name === 'client_id') {
        setClientID(value);
      }

      if (name === 'content_url') {
        setContent(new ContentURL(value));

        contentObject = {
          owner: null,
          repo: null,
          path: null,
          branch: null,
          url: value,
          isValid: false
        }
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
      const detailsObject: ProjectDetailsObject = {
        privacy: privacy,
        client_id: clientID,
        content: content ? content?.toContentURLObject() : null,
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
          <select id="privacy" name='privacy' value={privacy ?? ''} onChange={handleChangeSelect}>
            <option value={Privacy.Private}>Private</option>
            <option value={Privacy.Public}>Public</option>
          </select>
        </div>

        <div className="form-item-flex">
          <label htmlFor="client_id">Client ID:</label>
          <input type="text" id='client_id' name='client_id' value={clientID ?? ''} onChange={handleChange} />
        </div>

        <div className="form-item-flex">
          <label htmlFor="content_url">Content URL:</label>
          <input type="string" id="content_url" name="content_url" value={content?.url ?? ''} onChange={handleChange} />
        </div>

        <button onClick={handleUpdateDetails}>
          <h3>UPDATE DETAILS</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateDetails