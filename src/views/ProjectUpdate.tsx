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
import UpdateProcess from './components/update/process/UpdateProcess';
import UpdateSolution from './components/update/UpdateSolution';
import UpdateProblem from './components/update/UpdateProblem';
import StatusBarComponent from './components/StatusBarComponent';

import type { AppDispatch, RootState } from '@/model/store';
import Project, { ProjectObject } from '@/model/Project';
import Owner from '@/model/Owner';
import { ImageObject } from '@/model/Image';

const ProjectUpdate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { login, projectID } = useParams();

    const { projectLoading, projectPageLoading, projectErrorMessage, projectPageObject } = useSelector(
        (state: RootState) => state.project
    );
    const { updateLoading, updateLoadingMessage, updateErrorMessage, updateSuccessMessage, updateStatusCode, updatedProjectURLs } = useSelector(
        (state: RootState) => state.update
    );
    const { databaseLoading, databaseLoadingMessage, databaseStatusCode, databaseErrorMessage, projectDataObject } = useSelector(
        (state: RootState) => state.database
    );

    const [owner, setOwner] = useState<Owner>(new Owner({ login: login, name: 'Jamel C. Lyons' }));
    const [id, setId] = useState<string>();
    const [projectObject, setProjectObject] = useState<ProjectObject>(new Project(projectPageObject ?? {}).toProjectObject());
    const [project, setProject] = useState<Project>(new Project(projectObject));
    const [updatedTitle, setUpdatedTitle] = useState<string>(projectID ?? '');

    useEffect(() => {
        if (projectID) {
            setId(projectID);
        }
    }, [dispatch, projectID]);

    useEffect(() => {
        if (id) {
            dispatch(getProjectData(id));
        }
    }, [dispatch, id]);

    // useEffect(() => {
    //     if (databaseLoading && databaseLoadingMessage) {
    //         dispatch(setMessage(databaseLoadingMessage));
    //         dispatch(setMessageType('info'));
    //     }
    // }, [databaseLoading, dispatch]);

    useEffect(() => {
        if (projectPageObject) {
            setProjectObject(projectPageObject);
        }
    }, [projectPageObject, setProjectObject]);

    useEffect(() => {
        if (projectObject) {
            setProject(new Project(projectObject));
        }
    }, [projectObject, setProject]);

    // useEffect(() => {
    //     if (databaseErrorMessage) {
    //         dispatch(setMessageType('error'));
    //         dispatch(setMessage(databaseErrorMessage));
    //         dispatch(setShowStatusBar(Date.now));
    //     }
    // }, [dispatch, databaseErrorMessage]);

    // useEffect(() => {
    //     if (updateLoading && updateLoadingMessage) {
    //         dispatch(setMessage(updateLoadingMessage));
    //         dispatch(setMessageType('info'));
    //     }
    // }, [updateLoading, dispatch]);

    // useEffect(() => {
    //     if (updateErrorMessage) {
    //         dispatch(setMessage(updateErrorMessage));
    //         dispatch(setMessageType('error'));
    //         dispatch(setShowStatusBar(Date.now()));

    //     }
    // }, [updateErrorMessage, dispatch]);

    // useEffect(() => {
    //     if (updateSuccessMessage) {
    //         dispatch(setMessage(updateSuccessMessage));
    //         dispatch(setMessageType('success'));
    //         dispatch(setShowStatusBar(Date.now()));
    //     }
    // }, [updateSuccessMessage, dispatch]);

    useEffect(() => {
        if (updateStatusCode === 403 || databaseStatusCode === 403) {
            navigate('/login');
        }
    }, [updateStatusCode]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'title') {
                setUpdatedTitle(value);
            }

            const updatedProjectObject: ProjectObject = {
                ...projectObject,
                title: updatedTitle
            }

            setProject(new Project(updatedProjectObject))
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    const handleUpdateProject = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            dispatch(updateProject(project));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessageType('error'));
            dispatch(setMessage(err.message));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <section className='update-project'>
            <h1 className='title'>update project</h1>

            <form action="" id="add_project">
                <div className="form-item-flex">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={updatedTitle}
                        onChange={handleChange}
                    />
                </div>

                <button onClick={handleUpdateProject}>
                    <h3>Update Title</h3>
                </button>
            </form>

            <hr />

            <UpdateSolution projectObject={projectObject} />

            <hr />

            <UpdateProcess projectObject={projectObject} />

            <hr />

            <UpdateProblem projectObject={projectObject} />

            <hr />

            <UpdateDetails projectObject={projectObject} />

            <StatusBarComponent />
        </section>
    )
}

export default ProjectUpdate