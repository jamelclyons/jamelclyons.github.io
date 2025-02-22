import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/model/store';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateProblem } from '@/controllers/updateSlice';

import Gallery from '@/model/Gallery';

import UpdateGallery from './UpdateGallery';

interface UpdateProblemProps {
  projectID: string;
  projectDataObject: Record<string, any>;
}

const UpdateProblem: React.FC<UpdateProblemProps> = ({ projectDataObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updateLoading, updateErrorMessage, updateSuccessMessage, updatedGallery } = useSelector(
    (state: RootState) => state.update
  );

  const [gallery, setGallery] = useState<Gallery>(new Gallery(projectDataObject?.problem?.gallery));

  useEffect(() => {
    if (updateLoading) {
      dispatch(setMessage('Attempting to update the problem section of your project...'));
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
      setGallery(new Gallery(updatedGallery));
    }
  }, [updatedGallery, setGallery]);

  const handleUpdateProblem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const projectObject = {
        ...projectDataObject,
        problem: { gallery: gallery.toObject() },
      };

      dispatch(updateProblem(projectObject));
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

        <UpdateGallery gallery={gallery} />

        <hr />

        <button onClick={handleUpdateProblem}>
          <h3>Update Problem</h3>
        </button>
      </div>
    </>
  );
};

export default UpdateProblem;