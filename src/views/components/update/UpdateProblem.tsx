import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import type { AppDispatch, RootState } from '@/model/store';
import Gallery from '@/model/Gallery';
import Project, { ProjectObject } from '@/model/Project';
import ProjectProblem from '@/model/ProjectProblem';

import UpdateGallery from './components/UpdateGallery';
import ContentURL, { ContentURLObject } from '@/model/ContentURL';

interface UpdateProblemProps {
  project: Project;
}

const UpdateProblem: React.FC<UpdateProblemProps> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedProblemGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());
  const [problem, setProblem] = useState<ProjectProblem>(project.problem);
  const [gallery, setGallery] = useState<Gallery>(project.problem.gallery);
  const [content, setContent] = useState<ContentURL | null>(project.problem.contentURL);

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setProblem(project.problem);
  }, [project.problem, setProblem]);

  useEffect(() => {
    setContent(project.problem.contentURL);
  }, [project.problem.contentURL, setContent]);

  useEffect(() => {
    setGallery(project.problem.gallery);
  }, [project.problem.gallery, setGallery]);

  useEffect(() => {
    setGallery(problem.gallery);
  }, [problem.gallery, setGallery]);

  useEffect(() => {
    if (updatedProblemGallery) {
      setGallery(new Gallery(updatedProblemGallery));
    }
  }, [updatedProblemGallery, setGallery]);

  const handleProblemContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'problem_content_url') {
        const contentURL = new ContentURL(value);

        setContent(contentURL);

        setProblem(new ProjectProblem({
          gallery: gallery.toGalleryObject(),
          content_url: contentURL.toContentURLObject()
        }));
      }
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleUpdateProblem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        problem: {
          gallery: gallery.toGalleryObject(),
          content_url: content ? content.toContentURLObject() : null
        },
      };

      dispatch(updateProject(new Project(updatedProjectObject)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessage(err.message));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <div className="update" id="update_problem">

      <h2 className="title">Problem</h2>

      <UpdateGallery location='problem' gallery={gallery} />

      <hr />

      <div className="form-item-flex">
        <label htmlFor="problem_content_url">Problem Content URL:</label>
        <input type="text" name='problem_content_url' value={content?.url ?? ''} onChange={handleProblemContentURLChange} />
      </div>

      <button onClick={handleUpdateProblem}>
        <h3>UPDATE PROBLEM</h3>
      </button>
    </div>
  );
};

export default UpdateProblem;