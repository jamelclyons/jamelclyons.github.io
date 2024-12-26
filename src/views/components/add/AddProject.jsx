import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

function AddProject() {
  const dispatch = useDispatch();

  const { addLoading, addSuccessMessage, addErrorMessage } = useSelector(
    (state) => state.add
  );
  const { projectTypes, languages, frameworks, technologies } = useSelector(
    (state) => state.taxonomies
  );

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
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

  const [selectedProjectTypes, setSelectedProjectTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  const handleProjectTypesCheckboxChange = (id) => {
    setSelectedProjectTypes((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleLanguagesCheckboxChange = (id) => {
    setSelectedLanguages((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleFrameworksCheckboxChange = (id) => {
    setSelectedFrameworks((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleTechnologiesCheckboxChange = (id) => {
    setSelectedTechnologies((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;

      if (name === 'id') {
        setId(value);
      } else if (name === 'title') {
        setTitle(value);
      } else if (name === 'status') {
        setStatus(value);
      } else if (name === 'types') {
        setTypes(value);
      } else if (name === 'description') {
        setDescription(value);
      } else if (name === 'slug') {
        setSlug(value);
      } else if (name === 'design') {
        setDesign(value);
      } else if (name === 'design_check_list') {
        setDesignCheckList(value);
      } else if (name === 'design_gallery') {
        setDesignGallery(value);
      } else if (name === 'colors_list') {
        setColorsList(value);
      } else if (name === 'development') {
        setDevelopment(value);
      } else if (name === 'development_check_list') {
        setDevelopmentCheckList(value);
      } else if (name === 'repo_url') {
        setRepoURL(value);
      } else if (name === 'versions_list') {
        setVersionsList(value);
      } else if (name === 'project_languages') {
        setLanguages(value);
      } else if (name === 'project_frameworks') {
        setFrameworks(value);
      } else if (name === 'project_technologies') {
        setTechnologies(value);
      } else if (name === 'delivery') {
        setDelivery(value);
      } else if (name === 'delivery_gallery') {
        setDeliveryGallery(value);
      } else if (name === 'delivery_check_list') {
        setDeliveryCheckList(value);
      } else if (name === 'problem') {
        setProblem(value);
      } else if (name === 'problem_gallery') {
        setProblemGallery(value);
      } else if (name === 'solution') {
        setSolution(value);
      } else if (name === 'solution_gallery') {
        setSolutionGallery(value);
      } else if (name === 'urls_list') {
        setUrlsList(value);
      } else if (name === 'details_list') {
        setDetailsList(value);
      } else if (name === 'team_list') {
        setTeamList(value);
      } else if (name === 'client_id') {
        setClientID(value);
      }
    } catch (error) {
      dispatch(setMessage(error.message));
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

  const design = new ProjectDesign(designData);
  const development = new ProjectDevelopment(developmentData);
  const delivery = new ProjectDelivery(deliveryData);
  const process = new ProjectProcess(status, design, development, delivery);

  const problem = new ProjectProblem(problemData);
  const details = new ProjectDetails(detailsData);

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const project = new Project(
        id,
        title,
        description,
        urlsList,
        solution,
        process,
        problem,
        selectedProjectTypes,
        selectedLanguages,
        selectedFrameworks,
        selectedTechnologies,
        details
      ).toObject();

      dispatch(addProject(project));

      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while an attempt to log you is made.'));
    } catch (error) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
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

        <form action="">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={id}
            onChange={handleChange}
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="status"
            placeholder="Status"
            value={status}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleChange}
          />

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

          <input
            type="text"
            name="repo_url"
            placeholder="Repo URL"
            value={repoURL}
            onChange={handleChange}
          />

          {/* <input
            type="text"
            name="versions_list"
            placeholder="Versions List"
            value={versionsList}
            onChange={handleChange}
          /> */}

          <div className="project-selection">
            <label for="options">Choose Project Types:</label>

            {Array.isArray(projectTypes) &&
              projectTypes.map((item) => (
                <div className="project-checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    value={item.id}
                    checked={selectedProjectTypes.includes(item.id)}
                    onChange={() => handleProjectTypesCheckboxChange(item.id)}
                  />
                  <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
                </div>
              ))}
          </div>

          <div className="project-selection">
            <label for="options">Choose Languages:</label>

            {Array.isArray(languages) &&
              languages.map((item) => (
                <div className="project-checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    value={item.id}
                    checked={selectedLanguages.includes(item.id)}
                    onChange={() => handleLanguagesCheckboxChange(item.id)}
                  />
                  <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
                </div>
              ))}
          </div>

          <div className="project-selection">
            <label for="options">Choose Frameworks:</label>

            {Array.isArray(frameworks) &&
              projectTypes.map((item) => (
                <div className="project-checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    value={item.id}
                    checked={selectedFrameworks.includes(item.id)}
                    onChange={() => handleFrameworksCheckboxChange(item.id)}
                  />
                  <label htmlFor={`checkbox-${item.id}`}>{item.title}</label>
                </div>
              ))}
          </div>

          <div className="project-selection">
            <label for="options">Choose Technologies:</label>

            {Array.isArray(technologies) &&
              technologies.map((item) => (
                <div className="project-checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    value={item.id}
                    checked={selectedTechnologies.includes(item.id)}
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
