import React, { useEffect, useState, MouseEvent } from 'react';
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

import UpdateGallery from './UpdateGallery';

interface UpdateProblemProps {
  projectObject: ProjectObject;
}

const UpdateProblem: React.FC<UpdateProblemProps> = ({ projectObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updateLoading, updateErrorMessage, updateSuccessMessage, updatedGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [gallery, setGallery] = useState<GalleryObject>(projectObject.problem.gallery);

  useEffect(() => {
    if (updateLoading) {
      dispatch(setMessage(''));
      dispatch(setMessageType('info'));
    }
  }, [updateLoading, dispatch]);

  useEffect(() => {
    if (updateErrorMessage) {
      dispatch(setMessage(updateErrorMessage));
      dispatch(setMessageType('error'));
    }
  }, [updateErrorMessage, dispatch]);

  useEffect(() => {
    if (updateSuccessMessage) {
      dispatch(setMessage(updateSuccessMessage));
      dispatch(setMessageType('success'));
    }
  }, [updateSuccessMessage, dispatch]);

  useEffect(() => {
    if (updatedGallery) {
      setGallery({ logos: updatedGallery?.logos ?? [], icons: updatedGallery?.logos ?? [], animations: updatedGallery?.animations ?? [], uml_diagrams: updatedGallery?.uml_diagrams ?? [] });
    }
  }, [updatedGallery, setGallery]);

  const handleUpdateProblem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedProjectObject: ProjectObject = {
        ...projectObject,
        problem: { gallery: gallery, contentURL: '' },
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
    <>
      <h2 className="title">Problem</h2>

      <div className="update" id="update_problem">

        <UpdateGallery gallery={projectObject.problem.gallery} />

        <hr />

        <button onClick={handleUpdateProblem}>
          <h3>UPDATE PROBLEM</h3>
        </button>
      </div>
    </>
  );
};

export default UpdateProblem;