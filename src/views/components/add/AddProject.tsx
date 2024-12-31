import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import { addProject } from '../../../controllers/addSlice';
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
} from '../../../controllers/taxonomiesSlice';

import StatusBarComponent from '../StatusBarComponent';

import Project from '../../../model/Project';
import ProjectSolution from '../../../model/ProjectSolution';
import ProjectDesign from '../../../model/ProjectDesign';
import ProjectDevelopment from '../../../model/ProjectDevelopment';
import ProjectDelivery from '../../../model/ProjectDelivery';
import ProjectProcess from '../../../model/ProjectProcess';
import ProjectProblem from '../../../model/ProjectProblem';
import ProjectDetails from '../../../model/ProjectDetails';
import Taxonomy from '../../../model/Taxonomy';
import ProjectStatus from '../../../model/ProjectStatus';

const AddProject: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { addLoading, addSuccessMessage, addErrorMessage } = useSelector(
    (state: RootState) => state.add
  );
  const { projectTypes, languages, frameworks, technologies } = useSelector(
    (state: RootState) => state.taxonomies
  );

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  // const [design, setDesign] = useState([]);
  const [designCheckList, setDesignCheckList] = useState([]);
  const [designGallery, setDesignGallery] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  // const [development, setDevelopment] = useState([]);
  const [developmentCheckList, setDevelopmentCheckList] = useState([]);
  const [repoURL, setRepoURL] = useState('');
  const [versionsList, setVersionsList] = useState([]);

  // const [delivery, setDelivery] = useState([]);
  const [deliveryGallery, setDeliveryGallery] = useState([]);
  const [deliveryCheckList, setDeliveryCheckList] = useState([]);
  // const [problem, setProblem] = useState([]);
  const [problemGallery, setProblemGallery] = useState([]);
  // const [solution, setSolution] = useState([]);
  const [solutionGallery, setSolutionGallery] = useState([]);
  const [urlsList, setUrlsList] = useState([]);
  const [detailsList, setDetailsList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [clientID, setClientID] = useState('');

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'repo_url') {
        setRepoURL(value);
      } else if (name === 'title') {
        setTitle(value);
      } else if (name === 'slug') {
        setSlug(value);
      } else if (name === 'client_id') {
        setClientID(value);
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const solutionData = {
    solution_gallery: solutionGallery,
  };

  const designData = {
    design_check_list: designCheckList,
    design_gallery: designGallery,
    colors_list: colorsList,
  };

  const developmentData = {
    development_check_list: developmentCheckList,
    repo_url: repoURL,
    versions_list: versionsList,
  };

  const deliveryData = {
    delivery_gallery: deliveryGallery,
    delivery_check_list: deliveryCheckList,
  };

  const problemData = {};

  const detailsData = {};

  const solution = new ProjectSolution(solutionData);

  const status = new ProjectStatus();
  const design = new ProjectDesign(designData);
  const development = new ProjectDevelopment(developmentData);
  const delivery = new ProjectDelivery(deliveryData);
  const process = new ProjectProcess(status, design, development, delivery);

  const problem = new ProjectProblem(problemData);
  const details = new ProjectDetails(detailsData);

  const handleAddProject = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = document.getElementById('add_project') as HTMLFormElement;
    const formData = new FormData(form);

    if (repoURL) {
      const parsedUrl = new URL(repoURL);
      const pathname = parsedUrl.pathname;
      const parts = pathname.split('/');
      const filteredArray = parts.filter(item => item !== "");

      formData.append('id', filteredArray[1]);
    } else {
      throw new Error('A valid repo url is required.');
    }

    if (!title) {
      throw new Error('A valid project title is required.');
    }

    let project: Record<string, any> = {};

    formData.forEach((value, key) => {
      project[key] = value;
    });

    console.log(project);
    try {

      // dispatch(addProject(project));

      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while an attempt to log you is made.'));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  useEffect(() => {
    if (addLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [addLoading]);

  useEffect(() => {
    if (addSuccessMessage) {
      dispatch(setMessage(addSuccessMessage));
      dispatch(setMessageType('success'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [addSuccessMessage]);

  useEffect(() => {
    if (addErrorMessage) {
      dispatch(setMessage(addErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [addErrorMessage]);

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

  return (
    <>
      <main>
        <h2>Add Project</h2>

        <form action="" id="add_project">
          <input
            type="text"
            name="repo_url"
            placeholder="Repo URL"
            value={repoURL}
            onChange={handleChange}
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />

          {/* <input
            type="text"
            name="status"
            placeholder="Status"
            value={status}
            onChange={handleChange}
          /> */}

          <h2 className="title">design</h2>

          {/* <input
            type="text"
            name="design_check_list"
            placeholder="Design Check List"
            value={designCheckList}
            onChange={handleChange}
          /> */}

          {/* <input
            type="text"
            name="design_gallery"
            placeholder="Design Gallery"
            value={designGallery}
            onChange={handleChange}
          /> */}

          {/* <input
            type="text"
            name="colors_list"
            placeholder="Colors List"
            value={colors_list}
            onChange={handleChange}
          /> */}

          <h2 className="title">development</h2>

          {/* <input
            type="text"
            name="development_check_list"
            placeholder="Development Check List"
            value={developmentCheckList}
            onChange={handleChange}
          /> */}

          {/* <input
            type="text"
            name="versions_list"
            placeholder="Versions List"
            value={versionsList}
            onChange={handleChange}
          /> */}

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
          </div>

          <h2 className="title">delivery</h2>

          {/* <input
            type="text"
            name="delivery_gallery"
            placeholder="Delivery Gallery"
            value={delivery}
            onChange={handleChange}
          /> */}

          {/* <input
            type="text"
            name="delivery_check_list"
            placeholder="Delivery Check List"
            value={deliveryCheckList}
            onChange={handleChange}
          /> */}

          {/* Problem */}
          {/* Problem Gallery */}
          {/* Solution */}
          {/* Solution Gallery */}

          {/* <input
            type="text"
            name="urls_list"
            placeholder="URLs List"
            value={urlsList}
            onChange={handleChange}
          />

          <input
            type="text"
            name="details_list"
            placeholder="Details List"
            value={detailsList}
            onChange={handleChange}
          />

          <input
            type="text"
            name="team_list"
            placeholder="Team List"
            value={teamList}
            onChange={handleChange}
          /> */}

          <input
            type="text"
            name="client_id"
            placeholder="client_id"
            value={clientID}
            onChange={handleChange}
          />

          <button onClick={handleAddProject}>
            <h3>add</h3>
          </button>
        </form>

        <StatusBarComponent />
      </main>
    </>
  );
}

export default AddProject;
