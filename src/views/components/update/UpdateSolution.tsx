import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import Project from '../../../model/Project';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

import ProjectSolution from '../../../model/ProjectSolution';

interface UpdateSolutionProps {
  projectID: string;
  projectDataObject: Record<string, any>;
}

const UpdateSolution: React.FC<UpdateSolutionProps> = ({ projectID, projectDataObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [solution, setSolution] = useState<ProjectSolution>(new ProjectSolution(projectDataObject?.solution));

  const [gallery, setGallery] = useState<Record<string, any>>([]);
  const [features, setFeatures] = useState([]);
  const [content, setContent] = useState([]);
  const [urlsList, setUrlsList] = useState([]);
  const [currency, setCurrency] = useState();
  const [price, setPrice] = useState();
  const [ios, setIos] = useState();
  const [android, setAndroid] = useState();

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     const target = e.target as HTMLInputElement;

  //     const { name, value } = target;

  //     if (name === 'repo_url') {
  //       setRepoURL(value);
  //     } else if (name === 'title') {
  //       setTitle(value);
  //     }
  //   } catch (error) {
  //     const err = error as Error;
  //     dispatch(setMessage(err.message));
  //     dispatch(setMessageType('error'));
  //   }
  // };

  const handleUpdateSolution = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const form = document.getElementById('add_project') as HTMLFormElement;
      const formData = new FormData(form);

      // formData.append('gallery', gallery);
      // formData.append('features', features);
      // formData.append('content', content);
      // formData.append('urlsList', urlsList);

      let solution: Record<string, any> = {};

      formData.forEach((value, key) => {
        solution[key] = value;
      });

      // dispatch(addProject(project));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <>
      <h1 className="title">solution</h1>

      <form action="">
        <input type="text" id="currency" value={currency} placeholder='Currency Ex: USD' />

        <input type="text" id="price" value={price} placeholder='0.00' />

        <input type="text" id="ios" value={ios} placeholder='Link to iOS Application' />

        <input type="text" id="android" value={android} placeholder='Link to iOS Application' />

        <button onClick={handleUpdateSolution}>
          <h3>Update Solution</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateSolution