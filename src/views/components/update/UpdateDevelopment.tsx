import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import {
  getProjectTypes,
  getLanguages,
  getFrameworks,
  getTechnologies,
} from '../../../controllers/taxonomiesSlice';

import ProjectDevelopment from '../../../model/ProjectDevelopment';

const UpdateDevelopment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectTypes, languages, frameworks, technologies } = useSelector(
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

  const [developmentCheckList, setDevelopmentCheckList] = useState([]);
  const [versionsList, setVersionsList] = useState([]);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<Set<string>>(new Set());
  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());
  const [selectedFrameworks, setSelectedFrameworks] = useState<Set<string>>(new Set());
  const [selectedTechnologies, setSelectedTechnologies] = useState<Set<string>>(new Set());

  const handleProjectTypesCheckboxChange = (id: string) => {
    setSelectedProjectTypes((prevSelectedIds) => {
      const updatedSelection = new Set(prevSelectedIds);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return updatedSelection;
    });
  };

  const handleLanguagesCheckboxChange = (id: string) => {
    setSelectedLanguages((prevSelectedIds) => {
      const updatedSelection = new Set(prevSelectedIds);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return updatedSelection;
    });
  };

  const handleFrameworksCheckboxChange = (id: string) => {
    setSelectedFrameworks((prevSelectedIds) => {
      const updatedSelection = new Set(prevSelectedIds);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return updatedSelection;
    });
  };

  const handleTechnologiesCheckboxChange = (id: string) => {
    setSelectedTechnologies((prevSelectedIds) => {
      const updatedSelection = new Set(prevSelectedIds);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return updatedSelection;
    });
  };

  const developmentData = {
    development_check_list: developmentCheckList,
    repo_url: "repo url",
    versions_list: versionsList,
  };

  const development = new ProjectDevelopment(developmentData);

  return (
    <>
      <h2 className="title">development</h2>

      <div className="project-selection">
        <label htmlFor="options">Choose Project Types:</label>

        {Array.isArray(projectTypes) &&
          projectTypes.map((item) => (
            <div className="project-checkbox" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                checked={selectedProjectTypes.has(item.id)}
                onChange={() => handleProjectTypesCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Languages:</label>

        {Array.isArray(languages) &&
          languages.map((item) => (
            <div className="project-checkbox" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                checked={selectedLanguages.has(item.id)}
                onChange={() => handleLanguagesCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Frameworks:</label>

        {Array.isArray(frameworks) &&
          frameworks.map((item) => (
            <div className="project-checkbox" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                checked={selectedFrameworks.has(item.id)}
                onChange={() => handleFrameworksCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Technologies:</label>

        {Array.isArray(technologies) &&
          technologies.map((item) => (
            <div className="project-checkbox" key={item.id}>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                value={item.id}
                checked={selectedTechnologies.has(item.id)}
                onChange={() => handleTechnologiesCheckboxChange(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
            </div>
          ))}
      </div> </>)
}

export default UpdateDevelopment