import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import type { AppDispatch, RootState } from '../model/store';
import Repo from '../model/Repo';

import { getProject } from '../controllers/projectSlice';
import { updateProject } from '../controllers/updateSlice';
import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '../controllers/messageSlice';

import UpdateDetails from './components/update/UpdateDetails';
import UpdateProcess from './components/update/UpdateProcess';
import UpdateSolution from './components/update/UpdateSolution';
import UpdateProblem from './components/update/UpdateProblem';
import StatusBarComponent from './components/StatusBarComponent';

import Project from '../model/Project';

const ProjectUpdate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projectID } = useParams();

    const { updateLoading, updateErrorMessage, updateSuccessMessage } = useSelector(
        (state: RootState) => state.update
    );
    const { projectObject } = useSelector(
        (state: RootState) => state.project
    );

    const [project, setProject] = useState<Project>(new Project(projectObject));

    const { solution, process, problem, details } = project;

    const [title, setTitle] = useState<string>(project.title);
    const [repoURL, setRepoURL] = useState<string>(project.process.development.repoURL);

    useEffect(() => {
        if (projectID) {
            const repo = new Repo({ id: projectID });
            dispatch(getProject(repo));
        }
    }, [projectID]);

    useEffect(() => {
        if (projectObject) {
            setProject(new Project(projectObject));
        }
    }, [projectID]);

    useEffect(() => {
        if (updateLoading) {
            dispatch(setMessage('Standbye while an attempt to update the development section of your project is made.'));
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'repo_url') {
                setRepoURL(value);
            } else if (name === 'title') {
                setTitle(value);
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleUpdateProject = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {

            if (!repoURL) {
                throw new Error('A valid repo url is required.');
            }

            if (!title) {
                throw new Error('A valid project title is required.');
            }

            project.create(repoURL, title);

            dispatch(updateProject(project.toObject())).unwrap().then((response) => {
                dispatch(setMessageType('success'));
                dispatch(setMessage(response));
            });
        } catch (error) {
            const err = error as Error;
            dispatch(setMessageType('error'));
            dispatch(setMessage(err.message));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <section className='update-project'>
            <h2>Update Project</h2>

            <form action="" id="add_project">
                <input
                    type="text"
                    name="repo_url"
                    placeholder="Repo URL"
                    value={repoURL}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={handleChange}
                />

                <button onClick={handleUpdateProject}>
                    <h3>Update</h3>
                </button>
            </form>

            {projectID && <UpdateSolution projectID={projectID} solution={solution} />}

            {projectID && <UpdateProcess projectID={projectID} process={process} />}

            {projectID && <UpdateProblem projectID={projectID} problem={problem} />}

            {projectID && <UpdateDetails projectID={projectID} details={details} />}

            <StatusBarComponent />
        </section>
    )
}

export default ProjectUpdate