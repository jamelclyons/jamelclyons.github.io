import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProject } from '../../controllers/addSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../controllers/messageSlice';
import {
  getProjectTypes,
  getLanguages,
  getFrameworks,
  getTechnologies,
} from '../../controllers/taxonomiesSlice';

import StatusBarComponent from '../components/StatusBarComponent';

function AddProject() {
  const dispatch = useDispatch();

  const { addLoading, addStatusCode, addSuccessMessage, addErrorMessage } =
    useSelector((state) => state.add);
  const { languages, projectTypes, frameworks, technologies } =
    useSelector((state) => state.taxonomies);

  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [project_id, setProjectId] = useState('');
  const [project_title, setProjectTitle] = useState('');
  const [project_slug, setProjectSlug] = useState('');
  const [project_status, setProjectStatus] = useState('');
  const [description, setDescription] = useState('');
  const [gallery, setGallery] = useState('');
  const [project_languages, setProjectLanguages] = useState('');
  const [title, setTitle] = useState('');
  const [client_id, setClientId] = useState('');
  const [project_urls_list, setProjectUrlsList] = useState('');
  const [project_details_list, setProjectDetailsList] = useState('');
  const [project_versions_list, setProjectVersionsList] = useState('');
  const [design, setDesign] = useState('');
  const [design_check_list, setDesignCheckList] = useState('');
  const [colors_list, setColorsList] = useState('');
  const [development, setDevelopment] = useState('');
  const [development_check_list, setDevelopmentCheckList] = useState('');
  const [git_repo, setGitRepo] = useState('');
  const [delivery, setDelivery] = useState('');
  const [delivery_check_list, setDeliveryCheckList] = useState('');
  const [project_team_list, setProjectTeamList] = useState('');

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;

      if (name === 'id') {
        setId(value);
      } else if (name === 'price') {
        setPrice(value);
      } else if (name === 'project_id') {
        setProjectId(value);
      } else if (name === 'project_title') {
        setProjectTitle(value);
      } else if (name === 'project_slug') {
        setProjectSlug(value);
      } else if (name === 'project_status') {
        setProjectStatus(value);
      } else if (name === 'description') {
        setDescription(value);
      } else if (name === 'gallery') {
        setGallery(value);
      } else if (name === 'project_languages') {
        setProjectLanguages(value);
      } else if (name === 'title') {
        setTitle(value);
      } else if (name === 'client_id') {
        setClientId(value);
      } else if (name === 'project_urls_list') {
        setProjectUrlsList(value);
      } else if (name === 'project_details_list') {
        setProjectDetailsList(value);
      } else if (name === 'project_versions_list') {
        setProjectVersionsList(value);
      } else if (name === 'design') {
        setDesign(value);
      } else if (name === 'design_check_list') {
        setDesignCheckList(value);
      } else if (name === 'colors_list') {
        setColorsList(value);
      } else if (name === 'development') {
        setDevelopment(value);
      } else if (name === 'development_check_list') {
        setDevelopmentCheckList(value);
      } else if (name === 'git_repo') {
        setGitRepo(value);
      } else if (name === 'delivery') {
        setDelivery(value);
      } else if (name === 'delivery_check_list') {
        setDeliveryCheckList(value);
      } else if (name === 'project_team_list') {
        setProjectTeamList(value);
      }
    } catch (error) {
      dispatch(setMessage(error.message));
      dispatch(setMessageType('error'));
    }
  };

  const project = {
    id: id,
    price: price,
    project_id: project_id,
    project_title: project_title,
    project_slug: project_slug,
    description: description,
    gallery: gallery,
    project_status: project_status,
    project_languages: project_languages,
    title: title,
    client_id: client_id,
    project_urls_list: project_urls_list,
    project_details_list: project_details_list,
    project_status: project_status,
    project_versions_list: project_versions_list,
    design: design,
    design_check_list: design_check_list,
    colors_list: colors_list,
    development: development,
    development_check_list: development_check_list,
    git_repo: git_repo,
    delivery: delivery,
    delivery_check_list: delivery_check_list,
    project_team_list: project_team_list,
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
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
            name="price"
            placeholder="Price"
            value={price}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_id"
            placeholder="Project ID"
            value={project_id}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_title"
            placeholder="Project Title"
            value={project_title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_slug"
            placeholder="Project Slug"
            value={project_slug}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="gallery"
            placeholder="Gallery"
            value={gallery}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_status"
            placeholder="Project Status"
            value={project_status}
            onChange={handleChange}
          />

          <label for="options">Choose Languages:</label>
          <select id="options">
            {Array.isArray(languages) &&
              languages.map((language, index) => (
                <option key={index} value={language.id}>
                  {language.title}
                </option>
              ))}
          </select>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="client_id"
            placeholder="client_id"
            value={client_id}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_urls_list"
            placeholder="Project URLs List"
            value={project_urls_list}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_details_list"
            placeholder="Project Details List"
            value={project_details_list}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_versions_list"
            placeholder="Project Versions List"
            value={project_versions_list}
            onChange={handleChange}
          />

          <input
            type="text"
            name="design"
            placeholder="Design"
            value={design}
            onChange={handleChange}
          />

          <input
            type="text"
            name="design_check_list"
            placeholder="Design Check List"
            value={design_check_list}
            onChange={handleChange}
          />

          <input
            type="text"
            name="colors_list"
            placeholder="Colors List"
            value={colors_list}
            onChange={handleChange}
          />

          <input
            type="text"
            name="development"
            placeholder="Development"
            value={development}
            onChange={handleChange}
          />

          <input
            type="text"
            name="development_check_list"
            placeholder="Development Check List"
            value={development_check_list}
            onChange={handleChange}
          />

          <input
            type="text"
            name="git_repo"
            placeholder="Git Repo"
            value={git_repo}
            onChange={handleChange}
          />

          <input
            type="text"
            name="delivery"
            placeholder="Delivery"
            value={delivery}
            onChange={handleChange}
          />

          <input
            type="text"
            name="delivery_check_list"
            placeholder="Delivery Check List"
            value={delivery_check_list}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project_team_list"
            placeholder="Project Team List"
            value={project_team_list}
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
