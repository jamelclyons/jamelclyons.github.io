import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectProblem from '../../../model/ProjectProblem';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../../controllers/messageSlice';

interface UpdateProblemProps {
  projectID: string;
  problem: ProjectProblem;
}

const UpdateProblem: React.FC<UpdateProblemProps> = ({ projectID, problem }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updateLoading, updateErrorMessage, updateSuccessMessage } = useSelector(
    (state: RootState) => state.update
  );

  useEffect(() => {
    if (updateLoading) {
      dispatch(setMessage('Standbye while an attempt to update the problem section of your project is made.'));
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

  const [problemGallery, setProblemGallery] = useState(problem?.gallery);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     const target = e.target as HTMLInputElement;

  //     const { name, value } = target;

  //     if (name === 'progress') {
  //       setProgress(value.toString());
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
      const form = document.getElementById('update_problem') as HTMLFormElement;
      const formData = new FormData(form);

      let status: Record<string, any> = {};

      formData.forEach((value, key) => {
        status[key] = value;
      });

      // dispatch(addProject(project));

      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while an attempt to log you is made.'));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <>
      <h2 className="title">problem</h2>

      <form action="" id='update_problem'>
        {/* <input type="number" value={status} placeholder="Progress # 0-100" onChange={handleChange} /> */}

        <button onClick={handleUpdateSolution}>
          <h3>update</h3>
        </button>
      </form>
    </>
  )
}

export default UpdateProblem