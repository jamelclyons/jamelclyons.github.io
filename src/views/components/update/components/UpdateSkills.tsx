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
import { updateProjectSkills, updateSkills } from '../../../../controllers/updateSlice';

import type { AppDispatch, RootState } from '../../../../model/store';
import ProjectSkills, { ProjectSkillsObject } from '@/model/ProjectSkills';
import Taxonomy, { Framework, Language, ProjectType, Technology } from '@/model/Taxonomy';

interface UpdateSkillsProps {
  skillsObject: ProjectSkillsObject;
}

const UpdateSkills: React.FC<UpdateSkillsProps> = ({ skillsObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
    (state: RootState) => state.taxonomies
  );

  const [skills, setSkills] = useState<ProjectSkills>(new ProjectSkills(skillsObject));
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<Set<ProjectType>>(skills.types);
  const [selectedLanguages, setSelectedLanguages] = useState<Set<Language>>(skills.languages);
  const [selectedFrameworks, setSelectedFrameworks] = useState<Set<Framework>>(skills.frameworks);
  const [selectedTechnologies, setSelectedTechnologies] = useState<Set<Technology>>(skills.technologies);

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

  const existsInSet = (taxonomy: Taxonomy, set: Set<Taxonomy>) => {
    const map = new Map(
      Array.from(set).map((tax) => [tax.id, tax])
    );

    return map.has(taxonomy.id);
  };

  const handleProjectTypesCheckboxChange = (type: ProjectType) => {
    setSelectedProjectTypes((prevTypes) => {
      const updatedSelection = new Set(prevTypes);
      const exists = existsInSet(type, selectedProjectTypes);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== type.id)) : updatedSelection.add(type);
    });
  };

  const handleLanguagesCheckboxChange = (language: Language) => {
    setSelectedLanguages((prevLangs) => {
      const updatedSelection = new Set(prevLangs);
      const exists = existsInSet(language, selectedLanguages);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== language.id)) : updatedSelection.add(language)
    });
  };

  const handleFrameworksCheckboxChange = (framework: Framework) => {
    setSelectedFrameworks((prevFrameworks) => {
      const updatedSelection = new Set(prevFrameworks);
      const exists = existsInSet(framework, selectedFrameworks);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== framework.id)) : updatedSelection.add(framework)
    });
  };

  const handleTechnologiesCheckboxChange = (technology: Technology) => {
    setSelectedTechnologies((prevTechnologies) => {
      const updatedSelection = new Set(prevTechnologies);
      const exists = existsInSet(technology, selectedTechnologies);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== technology.id)) : updatedSelection.add(technology)
    });
  };

  const handleUpdateSkills = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedSkills: ProjectSkillsObject = {
        types: selectedProjectTypes.size > 0 ? Array.from(selectedProjectTypes).map((type) => type.toProjectTypeObject()) : [],
        languages: selectedLanguages.size > 0 ? Array.from(selectedLanguages).map((language) => language.toLanguageObject()) : [],
        frameworks: selectedFrameworks.size > 0 ? Array.from(selectedFrameworks).map((framework) => framework.toFrameworkObject()) : [],
        technologies: selectedTechnologies.size > 0 ? Array.from(selectedTechnologies).map((technology) => technology.toTechnologyObject()) : []
      };

      dispatch(updateProjectSkills(new ProjectSkills(updatedSkills)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <div className='update' id='update_skills'>
      <h3>Update Skills</h3>

      <div className="project-selection">
        <label htmlFor="options">Choose Project Types:</label>

        {Array.isArray(projectTypesObject) &&
          projectTypesObject.length > 0 &&
          Array.from(projectTypesObject)
            .map((type) => new ProjectType(type))
            .map((type) => (
              <div className="form-item-flex" key={type.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${type.id}`}
                  value={type.id}
                  checked={existsInSet(type, selectedProjectTypes)}

                  onChange={() => handleProjectTypesCheckboxChange(type)}
                />
                <label htmlFor={`checkbox-${type.id}`}>{type.title}</label>
              </div>
            ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Languages:</label>

        {Array.isArray(languagesObject) &&
          languagesObject.length > 0 &&
          Array.from(languagesObject)
            .map((lang) => new Language(lang))
            .map((language) => (
              <div className="form-item-flex" key={language.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${language.id}`}
                  value={language.id}
                  checked={existsInSet(language, selectedLanguages)}
                  onChange={() => handleLanguagesCheckboxChange(language)}
                />
                <label htmlFor={`checkbox-${language.id}`}>{language.title}</label>
              </div>
            ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Frameworks:</label>

        {Array.isArray(frameworksObject) &&
          frameworksObject.length > 0 &&
          Array.from(frameworksObject)
            .map((framework) => new Framework(framework))
            .map((framework) => (
              <div className="form-item-flex" key={framework.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${framework.id}`}
                  value={framework.id}
                  checked={existsInSet(framework, selectedFrameworks)}
                  onChange={() => handleFrameworksCheckboxChange(framework)}
                />
                <label htmlFor={`checkbox-${framework.id}`}>{framework.title}</label>
              </div>
            ))}
      </div>

      <div className="project-selection">
        <label htmlFor="options">Choose Technologies:</label>

        {Array.isArray(technologiesObject) &&
        technologiesObject.length > 0 &&
          Array.from(technologiesObject)
          .map((tech) => new Technology(tech))
          .map((technology) => (
            <div className="form-item-flex" key={technology.id}>
              <input
                type="checkbox"
                id={`checkbox-${technology.id}`}
                value={technology.id}
                checked={existsInSet(technology, selectedTechnologies)}
                onChange={() => handleTechnologiesCheckboxChange(technology)}
              />
              <label htmlFor={`checkbox-${technology.id}`}>{technology.title}</label>
            </div>
          ))}
      </div>

      <button onClick={handleUpdateSkills}>
        <h3>Update Skills</h3>
      </button>
    </div>
  )
}

export default UpdateSkills;