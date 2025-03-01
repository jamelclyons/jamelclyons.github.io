import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProject } from '@/controllers/updateSlice';

import type { AppDispatch, RootState } from '@/model/store';
import { GalleryObject } from '@/model/Gallery';
import Project, { ProjectObject } from '@/model/Project';
import { ProjectProblemObject } from '@/model/ProjectProblem';

import UpdateGallery from './components/UpdateGallery';

interface UpdateProblemProps {
  projectObject: ProjectObject;
}

const UpdateProblem: React.FC<UpdateProblemProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updatedProblemGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [problem, setProblem] = useState<ProjectProblemObject>(projectObject.problem);
  const [gallery, setGallery] = useState<GalleryObject>(projectObject.problem.gallery);
  const [contentURL, setContentURL] = useState<string>(projectObject.problem.content_url);

  useEffect(() => {
    setProblem(projectObject.problem);
  }, [projectObject.problem, setProblem]);

  useEffect(() => {
    setGallery(problem.gallery);
  }, [problem.gallery, setGallery]);

  useEffect(() => {
    if (updatedProblemGallery) {
      setGallery(updatedProblemGallery);
    }
  }, [updatedProblemGallery, setGallery]);

  const handleProblemContentURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;

      const { name, value } = target;

      if (name === 'problem_content_url') {
        setContentURL(value);

        setProblem({
          gallery: gallery,
          content_url: value
        });
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
          gallery: gallery,
          content_url: contentURL
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
        <input type="text" name='problem_content_url' value={contentURL ?? ''} onChange={handleProblemContentURLChange} />
      </div>

      <button onClick={handleUpdateProblem}>
        <h3>UPDATE PROBLEM</h3>
      </button>
    </div>
  );
};

export default UpdateProblem;