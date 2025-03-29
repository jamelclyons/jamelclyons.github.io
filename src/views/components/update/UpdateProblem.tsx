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
import DocumentURL, { DocumentURLObject } from '@/model/DocumentURL';

import UpdateGallery from './components/UpdateGallery';

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
  const [whitepaperURL, setWhitepaperURL] = useState<DocumentURL | null>(project.problem.whitepaperURL);

  useEffect(() => {
    setProjectObject(project.toProjectObject())
  }, [project, setProjectObject]);

  useEffect(() => {
    setProblem(project.problem);
  }, [project.problem, setProblem]);

  useEffect(() => {
    setWhitepaperURL(project.problem.whitepaperURL);
  }, [project.problem.whitepaperURL, setWhitepaperURL]);

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
        const contentURL = new DocumentURL(value);

        setWhitepaperURL(contentURL);

        setProblem(new ProjectProblem({
          gallery: gallery.toGalleryObject(),
          whitepaper_url: whitepaperURL ? whitepaperURL.toDocumentURLObject() : null
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
          whitepaper_url: whitepaperURL ? whitepaperURL.toDocumentURLObject() : null
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
        <input type="text" name='problem_content_url' value={whitepaperURL?.url ?? ''} onChange={handleProblemContentURLChange} />
      </div>

      <button onClick={handleUpdateProblem}>
        <h3>UPDATE PROBLEM</h3>
      </button>
    </div>
  );
};

export default UpdateProblem;