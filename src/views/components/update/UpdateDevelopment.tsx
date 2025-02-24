import React, { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../../model/store';
import { ProjectDevelopmentObject } from '@/model/ProjectDevelopment';
import { TaskObject } from '../../../model/Task';
import { ProjectVersionsObject } from '../../../model/ProjectVersions';
import Project, { ProjectObject } from '@/model/Project';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';
import {
  SkillsObject,
} from '../../../controllers/taxonomiesSlice';
import { updateProject } from '../../../controllers/updateSlice';

import UpdateSkills from './UpdateSkills';

interface UpdateDevelopmentProps {
  projectObject: ProjectObject;
}

const UpdateDevelopment: React.FC<UpdateDevelopmentProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [development, setDevelopment] = useState<ProjectDevelopmentObject>(projectObject.process.development);
  const [checkList, setCheckList] = useState<Array<TaskObject>>(projectObject.process.development.check_list);
  const [versionsList, setVersionsList] = useState<ProjectVersionsObject>(projectObject.process.development.versions_list);
  const [skills, setSkills] = useState<SkillsObject>(projectObject.process.development.skills);
  const [repoURL, setRepoURL] = useState<string>(projectObject.process.development.repo_url);
  const [contentURL, setContentURL] = useState<string>(projectObject.process.development.content_url);

  useEffect(() => {
    setDevelopment(projectObject.process.development)
  }, [projectObject.process.development, setDevelopment]);

  useEffect(() => {
    setCheckList(projectObject.process.development.check_list)
  }, [development.check_list, setCheckList]);

  useEffect(() => {
    setVersionsList(projectObject.process.development.versions_list)
  }, [development.versions_list, setVersionsList]);

  useEffect(() => {
    setSkills(projectObject.process.development.skills)
  }, [development.skills, setSkills]);

  const handleRepoURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'repo_url') {
      setRepoURL(value)

      setDevelopment({
        repo_url: value,
        content_url: contentURL,
        skills: skills,
        check_list: checkList,
        versions_list: versionsList
      })
    }
  }

  const handleContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'content_url') {
      setContentURL(value)

      setDevelopment({
        repo_url: repoURL,
        content_url: value,
        skills: skills,
        check_list: checkList,
        versions_list: versionsList
      })
    }
  }

  const handleUpdateDevelopment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedDevelopment: ProjectDevelopmentObject = {
        repo_url: repoURL,
        content_url: contentURL,
        skills: skills,
        check_list: checkList,
        versions_list: versionsList
      };

      const updatedProject: ProjectObject = {
        ...projectObject,
        process: {
          ...projectObject.process,
          development: updatedDevelopment
        }
      }

      dispatch(updateProject(new Project(updatedProject)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <>
      <h2 className="title">development</h2>

      <UpdateSkills skillsObject={skills} />

      {/* check list component */}

      <div className="form-item-flex">
        <label htmlFor="repo_url">Repo URL:</label>
        <input type="text" name='repo_url' value={repoURL ?? ''} onChange={handleRepoURLChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="content_url">Content URL:</label>
        <input type="text" name='content_url' value={contentURL ?? ''} onChange={handleContentURLChange} />
      </div>

      <button onClick={handleUpdateDevelopment}>
        <h3>Update Development</h3>
      </button>
    </>
  )
}

export default UpdateDevelopment