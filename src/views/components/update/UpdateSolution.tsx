import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import Project, { ProjectObject } from '@/model/Project';

import { ProjectSolutionObject } from '../../../model/ProjectSolution';
import { GalleryObject } from '@/model/Gallery';
import { FeatureObject } from '@/model/Feature';
import { ProjectURLsObject } from '@/model/ProjectURLs';
import { ProjectURLObject } from '@/model/ProjectURL';

import { updateProject } from '@/controllers/updateSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import UpdateFeatures from './components/UpdateFeatures';
import UpdateProjectURL from './components/UpdateProjectURL';

interface UpdateSolutionProps {
  projectObject: ProjectObject;
}

const UpdateSolution: React.FC<UpdateSolutionProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedGallery, updatedFeatures, updatedProjectURLs } = useSelector(
    (state: RootState) => state.update
  );

  const [solution, setSolution] = useState<ProjectSolutionObject>(projectObject.solution);
  const [gallery, setGallery] = useState<GalleryObject>(projectObject.solution.gallery);
  const [features, setFeatures] = useState<Array<FeatureObject>>(projectObject.solution.features);
  const [content, setContent] = useState<string>(projectObject.solution.content_url);
  const [projectURLs, setProjectURLs] = useState<ProjectURLsObject>(projectObject.solution.project_urls);
  const [currency, setCurrency] = useState<string>(projectObject.solution.currency);
  const [price, setPrice] = useState<number>(projectObject.solution.price);

  const [homepage, setHomepage] = useState<ProjectURLObject>(projectObject.solution.project_urls.homepage);
  const [ios, setIos] = useState<ProjectURLObject>(projectObject.solution.project_urls.ios);
  const [android, setAndroid] = useState<ProjectURLObject>(projectObject.solution.project_urls.android);

  useEffect(() => {
    setSolution(projectObject.solution)
  }, [projectObject.solution, setSolution]);

  useEffect(() => {
    setGallery(solution.gallery);
  }, [solution.gallery, setGallery]);

  useEffect(() => {
    if (updatedFeatures) {
      setFeatures(updatedFeatures.map((feature) => {
        const updatedFeature: FeatureObject = {
          name: feature.name
        }
        return updatedFeature;
      }));
    }
  }, [updatedFeatures, setFeatures]);

  useEffect(() => {
    if (updatedGallery) {
      setGallery({ logos: updatedGallery?.logos ?? [], icons: updatedGallery?.logos ?? [], animations: updatedGallery?.animations ?? [], uml_diagrams: updatedGallery?.uml_diagrams ?? [] });
    }
  }, [updatedGallery, setGallery]);

  useEffect(() => {
    if (updatedProjectURLs) {
      const updatedProjectURLsObject: ProjectURLsObject = {
        homepage: updatedProjectURLs?.homepage as ProjectURLObject,
        ios: updatedProjectURLs?.ios as ProjectURLObject,
        android: updatedProjectURLs?.android as ProjectURLObject
      }
      setProjectURLs(updatedProjectURLsObject);
    }
  }, [updatedProjectURLs, setProjectURLs]);

  const handleCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'currency') {
        setCurrency(value);

        setSolution({
          gallery: gallery,
          features: features,
          content_url: content,
          project_urls: projectURLs,
          currency: value,
          price: price,
        });
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'price') {
        setPrice(parseInt(value));

        setSolution({
          gallery: gallery,
          features: features,
          content_url: value,
          project_urls: projectURLs,
          currency: currency,
          price: price,
        });
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleSolutionContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'solution_content_url') {
        setContent(value);

        setSolution({
          gallery: gallery,
          features: features,
          content_url: value,
          project_urls: projectURLs,
          currency: currency,
          price: price,
        });
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleUpdateSolution = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedSolution: ProjectSolutionObject = {
        gallery: gallery,
        features: features,
        content_url: content,
        project_urls: projectURLs,
        currency: currency,
        price: price,
      };

      const updatedProject: ProjectObject = {
        ...projectObject,
        solution: updatedSolution
      }

      dispatch(updateProject(new Project(updatedProject)));
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

      <UpdateFeatures features={features} />

      <UpdateProjectURL projectURLsObject={projectURLs} />
      
      <div className="form-item-flex">
        <label htmlFor="currency">Currency:</label>
        <input type="text" id="currency" value={currency} placeholder='Currency Ex: USD' name='currency' onChange={handleCurrencyChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" value={price} placeholder='0.00' name='price' onChange={handlePriceChange} />
      </div>

      <div className="form-item-flex">
        <label htmlFor="solution_content_url">Solution Content URL:</label>
        <input type="text" id="solution_content_url" value={content ?? ''} placeholder='URL to the html content' name='solution_content_url' onChange={handleSolutionContentURLChange} />
      </div>

      <button onClick={handleUpdateSolution}>
        <h3>UPDATE SOLUTION</h3>
      </button>
    </>
  )
}

export default UpdateSolution