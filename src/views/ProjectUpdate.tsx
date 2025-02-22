import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getProjectData } from '@/controllers/databaseSlice';
import { updateProject } from '@/controllers/updateSlice';
import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';

import UpdateDetails from './components/update/UpdateDetails';
import UpdateProcess from './components/update/UpdateProcess';
import UpdateSolution from './components/update/UpdateSolution';
import UpdateProblem from './components/update/UpdateProblem';
import StatusBarComponent from './components/StatusBarComponent';

import type { AppDispatch, RootState } from '@/model/store';
import Project from '@/model/Project';
import GitHubRepoQuery from '@/model/GitHubRepoQuery';
import DBProject from '@/model/DBProject';

import { checkHeaders } from '@/utilities/Headers';
import { checkAdmin } from '@/controllers/authSlice';

const ProjectUpdate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { owner, projectID } = useParams();

    const { updateLoading, updateErrorMessage, updateSuccessMessage, updateStatusCode } = useSelector(
        (state: RootState) => state.update
    );
    const { databaseLoading, databaseStatusCode, databaseErrorMessage, projectDataObject } = useSelector(
        (state: RootState) => state.database
    );

    const [project, setProject] = useState<Project>(new Project());

    const { id, title, solution, process, problem, details } = project;

    const [updatedTitle, setUpdatedTitle] = useState<string>(title);

    useEffect(() => {
        if (projectID) {
            dispatch(getProjectData(projectID));
        }
    }, [dispatch, projectID]);

    useEffect(() => {
        if (projectDataObject) {
            setProject(new Project(projectDataObject));
        }
    }, [projectDataObject]);

    useEffect(() => {
        if (title) {
            setUpdatedTitle(title);
        }
    }, [title]);

    useEffect(() => {
        if (databaseErrorMessage) {
            dispatch(setMessageType('error'));
            dispatch(setMessage(databaseErrorMessage));
            dispatch(setShowStatusBar(Date.now));
        }
    }, [dispatch, databaseErrorMessage]);

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
            dispatch(setShowStatusBar(Date.now()));

        }
    }, [updateErrorMessage, dispatch]);

    useEffect(() => {
        if (updateSuccessMessage) {
            dispatch(setMessage(updateSuccessMessage));
            dispatch(setMessageType('success'));
            dispatch(setShowStatusBar(true));
        }
    }, [updateSuccessMessage, dispatch]);

    // useEffect(() => {
    //     if (updateStatusCode === 403) {
    //         navigate('/login');
    //     }
    // }, [updateStatusCode]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'title') {
                setUpdatedTitle(value);
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

            if (!updatedTitle) {
                throw new Error('A valid project title is required.');
            }

            const updatedProject = new DBProject({ id: id, title: updatedTitle });

            dispatch(updateProject(updatedProject));
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
                    name="title"
                    placeholder="Title"
                    value={updatedTitle}
                    onChange={handleChange}
                />

                <button onClick={handleUpdateProject}>
                    <h3>Update</h3>
                </button>
            </form>

            {projectID && <UpdateSolution projectID={projectID} solution={solution} />}

            {projectID && <UpdateProcess projectID={projectID} process={process} />}

            {projectID && projectDataObject && <UpdateProblem projectID={projectID} projectDataObject={projectDataObject} />}

            {/* {projectID && projectDataObject && <UpdateDetails projectID={projectID} projectDataObject={projectDataObject} />} */}

            <StatusBarComponent />
        </section>
    )
}

export default ProjectUpdate