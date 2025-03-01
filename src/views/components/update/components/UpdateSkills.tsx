import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../../controllers/messageSlice';
import {
  getProjectTypes,
  getLanguages,
  getFrameworks,
  getTechnologies,
  SkillsObject,
} from '../../../../controllers/taxonomiesSlice';
import { updateSkills } from '../../../../controllers/updateSlice';

import type { AppDispatch, RootState } from '../../../../model/store';
import ProjectSkills, { ProjectSkillsObject } from '@/model/ProjectSkills';

interface UpdateSkillsProps {
  skillsObject: SkillsObject;
}

const UpdateSkills: React.FC<UpdateSkillsProps> = ({ skillsObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [skills, setSkills] = useState<SkillsObject>(skillsObject);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState(skillsObject.types);
  const [selectedLanguages, setSelectedLanguages] = useState(skillsObject.languages);
  const [selectedFrameworks, setSelectedFrameworks] = useState(skillsObject.frameworks);
  const [selectedTechnologies, setSelectedTechnologies] = useState(skillsObject.technologies);

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


  const handleUpdateSkills = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedSkills: ProjectSkillsObject = {
        types: selectedProjectTypes,
        languages: selectedLanguages,
        frameworks: selectedFrameworks,
        technologies: selectedTechnologies
      };

      dispatch(updateSkills(new ProjectSkills(updatedSkills)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <>
      <h3>Update Skills</h3>

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
      </div>

      <button>
        <h3>Update Skills</h3>
      </button>
    </>
  )
}

export default UpdateSkills;