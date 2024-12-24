import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProjectType } from '../../../controllers/addSlice';
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

import Taxonomy from '../../../model/Taxonomy';

function AddProjectTypes() {
  const dispatch = useDispatch();

  const { addLoading, addStatusCode, addSuccessMessage, addErrorMessage } =
    useSelector((state) => state.add);
  const { projectTypes } = useSelector((state) => state.taxonomies);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');
  const [icon_url, setIconUrl] = useState('');
  const [class_name, setClassName] = useState('');

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;

      if (name === 'id') {
        setId(value);
      } else if (name === 'title') {
        setTitle(value);
      } else if (name === 'path') {
        setPath(value);
      } else if (name === 'icon_url') {
        setIconUrl(value);
      } else if (name === 'class_name') {
        setClassName(value);
      }
    } catch (error) {
      dispatch(setMessage(error.message));
      dispatch(setMessageType('error'));
    }
  };

  const projectType = new Taxonomy(
    id,
    'project-types',
    title,
    icon_url,
    class_name
  );

  const handleAddProjectType = async (e) => {
    e.preventDefault();

    try {
      if (projectType.isValid()) {
        dispatch(addProjectType(projectType));

        dispatch(setMessageType('info'));
        dispatch(setMessage('Standbye while an attempt to log you is made.'));
      }
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

  return (
    <>
      <main>
        <h2>Add Project Types</h2>

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
            name="icon_url"
            placeholder="icon_url"
            value={icon_url}
            onChange={handleChange}
          />

          <input
            type="text"
            name="class_name"
            placeholder="class_name"
            value={class_name}
            onChange={handleChange}
          />

          <button onClick={handleAddProjectType}>
            <h3>add</h3>
          </button>
        </form>

        <StatusBarComponent />
      </main>
    </>
  );
}

export default AddProjectTypes;
