import React, { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import { ProjectDevelopmentObject } from '@/model/ProjectDevelopment';
import { TaskObject } from '../../../../model/Task';
import { ProjectVersionsObject } from '../../../../model/ProjectVersions';
import Project, { ProjectObject } from '@/model/Project';
import { ProjectSkillsObject } from '@/model/ProjectSkills';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../../controllers/messageSlice';
import { updateProject } from '../../../../controllers/updateSlice';

import UpdateCheckList from '../components/UpdateCheckList';
import UpdateSkills from '../components/UpdateSkills';
import UpdateProjectVersions from '../components/UpdateProjectVersions';
import { GalleryObject } from '@/model/Gallery';
import UpdateGallery from '../components/UpdateGallery';

interface UpdateDevelopmentProps {
  projectObject: ProjectObject;
}

const UpdateDevelopment: React.FC<UpdateDevelopmentProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedCheckList, updatedVersionsList, updatedProjectSkills, updatedDevelopmentGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [development, setDevelopment] = useState<ProjectDevelopmentObject>(projectObject.process.development);
  const [gallery, setGallery] = useState<GalleryObject>(projectObject.process.development.gallery);
  const [checkList, setCheckList] = useState<Array<TaskObject>>(projectObject.process.development.check_list);
  const [projectSkills, setProjectSkills] = useState<ProjectSkillsObject>(projectObject.process.development.skills);
  const [repoURL, setRepoURL] = useState<string>(projectObject.process.development.repo_url);
  const [contentURL, setContentURL] = useState<string>(projectObject.process.development.content_url);
  const [projectVersions, setProjectVersions] = useState<ProjectVersionsObject>(projectObject.process.development.versions_list);

  useEffect(() => {
    setDevelopment(projectObject.process.development)
  }, [projectObject.process.development, setDevelopment]);

  useEffect(() => {
    setCheckList(projectObject.process.development.check_list)
  }, [development.check_list, setCheckList]);

  useEffect(() => {
    setProjectVersions(projectObject.process.development.versions_list)
  }, [development.versions_list, setProjectVersions]);

  useEffect(() => {
    setProjectSkills(projectObject.process.development.skills)
  }, [development.skills, setProjectSkills]);

  useEffect(() => {
    if (updatedDevelopmentGallery) {
      setGallery(updatedDevelopmentGallery);
    }
  }, [updatedDevelopmentGallery, setGallery]);

  useEffect(() => {
    if (updatedCheckList) {
      setCheckList(updatedCheckList.map((task) => {
        const taskObject: TaskObject = { name: task?.name, status: task?.status }
        return taskObject
      }))
    }
  }, [updatedCheckList, setCheckList]);

  useEffect(() => {
    if (updatedVersionsList) {
      const projectVersionsObject: ProjectVersionsObject = {
        current: updatedVersionsList?.current,
        previous: updatedVersionsList?.previous
      }
      setProjectVersions(projectVersionsObject)
    }
  }, [updatedVersionsList, setProjectVersions]);

  useEffect(() => {
    if (updatedProjectSkills) {
      const projectSkillsObject: ProjectSkillsObject = {
        types: updatedProjectSkills.types,
        languages: updatedProjectSkills.languages,
        frameworks: updatedProjectSkills.frameworks,
        technologies: updatedProjectSkills.technologies
      }
      setProjectSkills(projectSkillsObject)
    }
  }, [updatedProjectSkills, setProjectSkills]);

  const handleRepoURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'repo_url') {
      setRepoURL(value)

      setDevelopment({
        gallery: gallery,
        repo_url: value,
        content_url: contentURL,
        skills: projectSkills,
        check_list: checkList,
        versions_list: projectVersions
      })
    }
  }

  const handleDevelopmentContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'content_url') {
      setContentURL(value)

      setDevelopment({
        gallery: gallery,
        repo_url: repoURL,
        content_url: value,
        skills: projectSkills,
        check_list: checkList,
        versions_list: projectVersions
      })
    }
  }

  const handleUpdateDevelopment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedDevelopment: ProjectDevelopmentObject = {
        gallery: gallery,
        repo_url: repoURL,
        content_url: contentURL,
        skills: projectSkills,
        check_list: checkList,
        versions_list: projectVersions
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
    <div className='update' id='update_development'>
      <h2 className="title">development</h2>

      <UpdateGallery location='development' gallery={gallery} />

      <br />

      <UpdateCheckList checkList={checkList} />

      <br />

      <UpdateSkills skillsObject={projectSkills} />

      <br />

      <UpdateProjectVersions projectVersionsObject={projectVersions} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="repo_url">Repo URL:</label>
        <input type="text" name='repo_url' value={repoURL ?? ''} onChange={handleRepoURLChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="development_content_url">Development Content URL:</label>
        <input type="text" name='development_content_url' value={contentURL ?? ''} onChange={handleDevelopmentContentURLChange} />
      </div>

      <button onClick={handleUpdateDevelopment}>
        <h3>Update Development</h3>
      </button>
    </div>
  )
}

export default UpdateDevelopment