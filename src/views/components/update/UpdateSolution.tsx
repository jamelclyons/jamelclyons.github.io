import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import Project, { ProjectObject } from '@/model/Project';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

import ProjectSolution, { ProjectSolutionObject } from '../../../model/ProjectSolution';

interface UpdateSolutionProps {
  projectObject: ProjectObject;
}

const UpdateSolution: React.FC<UpdateSolutionProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [solution, setSolution] = useState<ProjectSolutionObject>(projectObject.solution);

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
        <div className="form-item-flex">
          <label htmlFor="currency">Currency:</label>
          <input type="text" id="currency" value={currency} placeholder='Currency Ex: USD' name='currency' />
        </div>

        <div className="form-item-flex">
          <label htmlFor="currency">Price:</label>
          <input type="text" id="price" value={price} placeholder='0.00' />
        </div>

        <div className="form-item-flex">
          <label htmlFor="currency">Apple App Store Link:</label>
          <input type="text" id="ios" value={ios} placeholder='Link to iOS Application' />
        </div>

        <div className="form-item-flex">
          <label htmlFor="currency">Google Play Link:</label>
          <input type="text" id="android" value={android} placeholder='Link to Android Application' />
        </div>

        <button onClick={handleUpdateSolution}>
          <h3>UPDATE SOLUTION</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateSolution