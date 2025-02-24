import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '../../../model/store';
import { ProjectStatusObject } from '../../../model/ProjectStatus';
import Project, { ProjectObject } from '@/model/Project';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '../../../controllers/messageSlice';
import { updateProject } from '../../../controllers/updateSlice';

interface UpdateStatusProps {
    projectObject: ProjectObject;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ projectObject }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [status, setStatus] = useState<ProjectStatusObject>(projectObject.process.status);
    const [progress, setProgress] = useState<string>(projectObject.process.status.progress);

    useEffect(() => {
        setStatus(projectObject.process.status)
    }, [projectObject.process.status, setStatus]);

    useEffect(() => {
        setProgress(projectObject.process.status.progress)
    }, [projectObject.process.status.progress, setProgress]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'progress') {
                setProgress(value);
            }

            setStatus({
                created_at: '',
                updated_at: '',
                progress: value
            });
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleUpdateStatus = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const updatedProjectStatus: ProjectStatusObject = {
                created_at: '',
                updated_at: '',
                progress: progress
            }

            const updatedProjectObject: ProjectObject = {
                ...projectObject,
                process: {
                    ...projectObject.process,
                    status: updatedProjectStatus
                }
            };

            dispatch(updateProject(new Project(updatedProjectObject)));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessageType('error'));
            dispatch(setMessage(err.message));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (<>
        <h2 className="title">status</h2>

        <form action="" id='update_status'>
            <progress value={progress} max="100"></progress>

            <div className="form-item-flex">
                <label htmlFor="progress">Completed</label>
                <input type="number" value={progress} placeholder="Progress # 0-100" onChange={handleChange} id='progress' name='progress' />
            </div>

            <button onClick={handleUpdateStatus}>
                <h3>Update Status</h3>
            </button>
        </form>
    </>
    )
}

export default UpdateStatus