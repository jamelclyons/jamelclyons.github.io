import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import { addProject } from '../../../controllers/addSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

import StatusBarComponent from '../StatusBarComponent';

import Project from '../../../model/Project';

import UpdateDetails from '../update/UpdateDetails';
import UpdateProcess from '../update/UpdateProcess';
import UpdateSolution from '../update/UpdateSolution';
import UpdateProblem from '../update/UpdateProblem';

const AddProject: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { addLoading, addSuccessMessage, addErrorMessage } = useSelector(
    (state: RootState) => state.add
  );

  const [repoURL, setRepoURL] = useState('');
  const [title, setTitle] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'repo_url') {
        setRepoURL(value);
      } else if (name === 'title') {
        setTitle(value);
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

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
      // dispatch(addProject(new Project(project)));

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

          <UpdateSolution />

          <UpdateProcess />

          <UpdateProblem />

          <UpdateDetails />

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
