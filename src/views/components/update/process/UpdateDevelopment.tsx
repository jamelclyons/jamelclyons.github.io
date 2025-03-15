import React, { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import { ProjectDevelopmentObject } from '@/model/ProjectDevelopment';
import ProjectVersions, { ProjectVersionsObject } from '@/model/ProjectVersions';
import Project, { ProjectObject } from '@/model/Project';
import ProjectSkills from '@/model/ProjectSkills';
import Gallery from '@/model/Gallery';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import UpdateCheckList from '../components/UpdateCheckList';
import UpdateSkills from '../components/UpdateSkills';
import UpdateProjectVersions from '../components/UpdateProjectVersions';
import UpdateGallery from '../components/UpdateGallery';

interface UpdateDevelopmentProps {
  project: Project;
}

const UpdateDevelopment: React.FC<UpdateDevelopmentProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedDevelopmentCheckList, updatedVersionsList, updatedProjectSkills, updatedDevelopmentGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

  const [gallery, setGallery] = useState<Gallery>(project.process.development.gallery);
  const [checkList, setCheckList] = useState<CheckList>(project.process.development.checkList);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills>(project.process.development.skills);
  const [repoURL, setRepoURL] = useState<string>(project.process.development.repoURL);
  const [content, setContent] = useState<ContentURL | null>(project.process.development.contentURL);
  const [projectVersions, setProjectVersions] = useState<ProjectVersions>(project.process.development.versionsList);

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setGallery(project.process.development.gallery)
  }, [project.process.development.gallery, setGallery])

  useEffect(() => {
    setCheckList(project.process.development.checkList)
  }, [project.process.development.checkList, setCheckList]);

  useEffect(() => {
    setProjectSkills(project.process.development.skills)
  }, [project.process.development.skills, setProjectSkills]);

  useEffect(() => {
    setRepoURL(project.process.development.repoURL)
  }, [project.process.development.repoURL, setRepoURL]);

  useEffect(() => {
    setContent(project.process.development.contentURL)
  }, [project.process.development.contentURL, setContent]);

  useEffect(() => {
    setProjectVersions(project.process.development.versionsList)
  }, [project.process.development.versionsList, setProjectVersions]);

  useEffect(() => {
    if (updatedDevelopmentGallery) {
      setGallery(new Gallery(updatedDevelopmentGallery));
    }
  }, [updatedDevelopmentGallery, setGallery]);

  useEffect(() => {
    if (updatedDevelopmentCheckList) {
      setCheckList(new CheckList(updatedDevelopmentCheckList))
    }
  }, [updatedDevelopmentCheckList, setCheckList]);

  useEffect(() => {
    if (updatedProjectSkills) {
      setProjectSkills(new ProjectSkills(updatedProjectSkills))
    }
  }, [updatedProjectSkills, setProjectSkills]);

  useEffect(() => {
    if (updatedVersionsList) {
      const projectVersionsObject: ProjectVersionsObject = {
        current: updatedVersionsList?.current,
        history: updatedVersionsList?.history
      }
      setProjectVersions(new ProjectVersions(projectVersionsObject))
    }
  }, [updatedVersionsList, setProjectVersions]);

  const handleRepoURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'repo_url') {
      setRepoURL(value)
    }
  }

  const handleDevelopmentContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value } = target;

    if (name === 'content_url') {
      setContent(new ContentURL(value));
    }
  }

  const handleUpdateDevelopment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedDevelopment: ProjectDevelopmentObject = {
        gallery: gallery.toGalleryObject(),
        repo_url: repoURL,
        content_url: content ? content.toContentURLObject() : null,
        skills: projectSkills.toProjectSkillsObject(),
        check_list: checkList.toCheckListObject(),
        versions_list: projectVersions.toProjectVersionsObject()
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

      <UpdateCheckList location='development' checkList={checkList} />

      <br />

      <UpdateSkills projectSkills={projectSkills} />

      <br />

      <UpdateGallery location='development' gallery={gallery} />

      <br />

      <UpdateProjectVersions projectVersions={projectVersions} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="repo_url">Repo URL:</label>
        <input type="text" name='repo_url' value={repoURL ?? ''} onChange={handleRepoURLChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="development_content_url">Development Content URL:</label>
        <input type="text" name='development_content_url' value={content?.url ?? ''} onChange={handleDevelopmentContentURLChange} />
      </div>

      <button onClick={handleUpdateDevelopment}>
        <h3>Update Development</h3>
      </button>
    </div>
  )
}

export default UpdateDevelopment