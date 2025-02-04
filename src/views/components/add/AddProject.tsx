import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import Project from '../../../model/Project';

import { addProject } from '../../../controllers/addSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

import UpdateDetails from '../update/UpdateDetails';
import UpdateProcess from '../update/UpdateProcess';
import UpdateSolution from '../update/UpdateSolution';
import UpdateProblem from '../update/UpdateProblem';

import StatusBarComponent from '../StatusBarComponent';

const AddProject: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { addLoading, addSuccessMessage, addErrorMessage } = useSelector(
    (state: RootState) => state.add
  );

  const [repoURL, setRepoURL] = useState('');
  const [title, setTitle] = useState('');
  const [project, setProject] = useState<Project>(new Project())
  const [projectID, setProjectID] = useState(project.id);

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

    try {

      if (!repoURL) {
        throw new Error('A valid repo url is required.');
      }

      if (!title) {
        throw new Error('A valid project title is required.');
      }

      project.create(repoURL, title);

      dispatch(addProject(project.toObject())).unwrap().then((response) => {
        setProjectID(response.project_id);
        dispatch(setMessageType('success'));
        dispatch(setMessage(response.success_message));
      });
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
      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while an attempt to log you is made.'));
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

          <button onClick={handleAddProject}>
            <h3>add</h3>
          </button>
        </form>

        <UpdateSolution projectID={projectID} solution={project.solution} />

        <UpdateProcess projectID={projectID} process={project.process}/>

        <UpdateProblem projectID={projectID} problem={project.problem}/>

        <UpdateDetails projectID={projectID} details={project.details}/>

        <StatusBarComponent />
      </main>
    </>
  );
}

export default AddProject;
