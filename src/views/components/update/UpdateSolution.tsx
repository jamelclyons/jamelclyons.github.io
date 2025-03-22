import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import Project, { ProjectObject } from '@/model/Project';
import ProjectSolution, { ProjectSolutionObject } from '@/model/ProjectSolution';
import Gallery from '@/model/Gallery';
import Feature from '@/model/Feature';
import ProjectURLs from '@/model/ProjectURLs';
import ContentURL, { ContentURLObject } from '@/model/ContentURL';

import { updateProject } from '@/controllers/updateSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';

import UpdateFeatures from './components/UpdateFeatures';
import UpdateProjectURL from './components/UpdateProjectURL';
import UpdateGallery from './components/UpdateGallery';

interface UpdateSolutionProps {
  project: Project;
}

const UpdateSolution: React.FC<UpdateSolutionProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedSolutionGallery, updatedFeatures, updatedProjectURLs } = useSelector(
    (state: RootState) => state.update
  );

  const [solution, setSolution] = useState<ProjectSolution>(project.solution);
  const [gallery, setGallery] = useState<Gallery>(project.solution.gallery);
  const [features, setFeatures] = useState<Set<Feature>>(project.solution.features);
  const [content, setContent] = useState<ContentURL | null>(project.solution.contentURL);
  const [projectURLs, setProjectURLs] = useState<ProjectURLs>(project.solution.projectURLs);

  useEffect(() => {
    setSolution(project.solution)
  }, [project.solution, setSolution]);

  useEffect(() => {
    setGallery(project.solution.gallery);
  }, [project.solution.gallery, setGallery]);

  useEffect(() => {
    setFeatures(project.solution.features);
  }, [project.solution.features, setFeatures]);

  useEffect(() => {
    setContent(project.solution.contentURL);
  }, [project.solution.contentURL, setContent]);

  useEffect(() => {
    setProjectURLs(project.solution.projectURLs);
  }, [project.solution.projectURLs, setProjectURLs]);

  useEffect(() => {
    setGallery(solution.gallery);
  }, [solution.gallery, setGallery]);

  useEffect(() => {
    if (updatedSolutionGallery) {
      setGallery(new Gallery(updatedSolutionGallery));
    }
  }, [updatedSolutionGallery, setGallery]);

  useEffect(() => {
    if (updatedFeatures) {
      setFeatures(new Set(updatedFeatures.map((feature) => new Feature(feature))));
    }
  }, [updatedFeatures, setFeatures]);

  useEffect(() => {
    if (updatedProjectURLs &&
      (updatedProjectURLs.homepage !== undefined || updatedProjectURLs.ios !== undefined || updatedProjectURLs.android !== undefined)) {
      const updatedProjectURLsObject = {
        homepage: { url: updatedProjectURLs.homepage },
        ios: { url: updatedProjectURLs.ios },
        android: { url: updatedProjectURLs.android }
      }
      setProjectURLs(new ProjectURLs(updatedProjectURLsObject));
    }
  }, [updatedProjectURLs, setProjectURLs]);

  
  const handleSolutionContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'solution_content_url') {
        const contentURLObject: ContentURLObject = {
          owner: null,
          repo: null,
          path: null,
          branch: null,
          url: value,
          isValid: false
        }

        setContent(new ContentURL(value));

        setSolution(new ProjectSolution({
          gallery: gallery,
          features: features,
          content_url: contentURLObject,
          project_urls: projectURLs
        }));
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
        gallery: gallery.toGalleryObject(),
        features: Array.from(features),
        content_url: content,
        project_urls: projectURLs.toProjectURLsObject()
      };

      const updatedProject: ProjectObject = {
        ...project.toProjectObject(),
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
    <div className='update' id='update_solution'>
      <h1 className="title">solution</h1>

      <UpdateGallery location='solution' gallery={gallery} />

      <br />

      <UpdateFeatures features={features} />

      <br />

      <UpdateProjectURL projectURLs={projectURLs} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="solution_content_url">Solution Content URL:</label>
        <input type="text" id="solution_content_url" value={content?.url ?? ''} placeholder='URL to the html content' name='solution_content_url' onChange={handleSolutionContentURLChange} />
      </div>

      <button onClick={handleUpdateSolution}>
        <h3>UPDATE SOLUTION</h3>
      </button>
    </div>
  )
}

export default UpdateSolution