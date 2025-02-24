import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectDevelopment, { ProjectDevelopmentObject } from '@/model/ProjectDevelopment';
import Task, { TaskObject } from '../../../model/Task';
import ProjectVersions, { ProjectVersionsObject } from '../../../model/ProjectVersions';
import { ProjectObject } from '@/model/Project';
import Taxonomy from '@/model/Taxonomy';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';
import {
  getProjectTypes,
  getLanguages,
  getFrameworks,
  getTechnologies,
  SkillsObject,
} from '../../../controllers/taxonomiesSlice';
import { updateDevelopment } from '../../../controllers/updateSlice';

interface UpdateDevelopmentProps {
  projectObject: ProjectObject;
}

const UpdateDevelopment: React.FC<UpdateDevelopmentProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
    (state: RootState) => state.taxonomies
  );

  useEffect(() => {
    dispatch(getProjectTypes());
  }, []);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    dispatch(getFrameworks());
  }, []);

  useEffect(() => {
    dispatch(getTechnologies());
  }, []);

  const [development, setDevelopment] = useState<ProjectDevelopmentObject>(projectObject.process.development);
  const [checkList, setCheckList] = useState<Array<TaskObject>>(development.check_list);
  const [versionsList, setVersionsList] = useState<ProjectVersionsObject>(development.versions_list);
  const [skills, setSkills] = useState<SkillsObject>(development.skills);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState(skills.types);
  const [selectedLanguages, setSelectedLanguages] = useState(development.skills.languages);
  const [selectedFrameworks, setSelectedFrameworks] = useState(development.skills.frameworks);
  const [selectedTechnologies, setSelectedTechnologies] = useState(development.skills.technologies);

  // const handleProjectTypesCheckboxChange = (id: string) => {
  //   setSelectedProjectTypes((prevSelectedIds) => {
  //     const updatedSelection = new Set(prevSelectedIds);

      // if (updatedSelection.has(id)) {
      //   updatedSelection.delete(id);
      // } else {
      //   updatedSelection.add(id);
      // }

  //     return updatedSelection;
  //   });
  // };

  // const handleLanguagesCheckboxChange = (id: string) => {
  //   setSelectedLanguages((prevSelectedIds) => {
  //     const updatedSelection = new Set(prevSelectedIds);

      // if (updatedSelection.has(id)) {
      //   updatedSelection.delete(id);
      // } else {
      //   updatedSelection.add(id);
      // }

  //     return updatedSelection;
  //   });
  // };

  // const handleFrameworksCheckboxChange = (id: string) => {
  //   setSelectedFrameworks((prevSelectedIds) => {
  //     const updatedSelection = new Set(prevSelectedIds);

      // if (updatedSelection.has(id)) {
      //   updatedSelection.delete(id);
      // } else {
      //   updatedSelection.add(id);
      // }

  //     return updatedSelection;
  //   });
  // };

  // const handleTechnologiesCheckboxChange = (id: string) => {
  //   setSelectedTechnologies((prevSelectedIds) => {
  //     const updatedSelection = new Set(prevSelectedIds);

      // if (updatedSelection.has(id)) {
      //   updatedSelection.delete(id);
      // } else {
      //   updatedSelection.add(id);
      // }

  //     return updatedSelection;
  //   });
  // };


  const handleUpdateDelivery = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const form = document.getElementById('update_delivery') as HTMLFormElement;
      const formData = new FormData(form);

      let developmentData: Record<string, any> = {};

      formData.forEach((value, key) => {
        developmentData[key] = value;
      });

      let data: Record<string, any> = {
        delivery: developmentData
      };

      dispatch(updateDevelopment(data));
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

      <div className="project-selection">
        <label htmlFor="options">Choose Project Types:</label>

        {Array.isArray(projectTypesObject) &&
          projectTypesObject.map((item) => (
            <div className="form-item-flex" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                // checked={selectedProjectTypes.has(item.id)}
                // onChange={() => handleProjectTypesCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Languages:</label>

        {Array.isArray(languagesObject) &&
          languagesObject.map((item) => (
            <div className="form-item-flex" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                // checked={selectedLanguages.has(item.id)}
                // onChange={() => handleLanguagesCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Frameworks:</label>

        {Array.isArray(frameworksObject) &&
          frameworksObject.map((item) => (
            <div className="form-item-flex" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                // checked={selectedFrameworks.has(item.id)}
                // onChange={() => handleFrameworksCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Technologies:</label>

        {Array.isArray(technologiesObject) &&
          technologiesObject.map((item) => (
            <div className="form-item-flex" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                // checked={selectedTechnologies.has(item.id)}
                // onChange={() => handleTechnologiesCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div> </>)
}

export default UpdateDevelopment