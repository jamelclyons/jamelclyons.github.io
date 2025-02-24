import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectStatus, { ProjectStatusObject } from '../../../model/ProjectStatus';
import { ProjectObject } from '@/model/Project';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '../../../controllers/messageSlice';
import { updateStatus } from '../../../controllers/updateSlice';

interface UpdateStatusProps {
    projectObject: ProjectObject;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ projectObject }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [status, setStatus] = useState<ProjectStatusObject>(projectObject.process.status);
    const [progress, setProgress] = useState(status.progress);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'progress') {
                setProgress(value.toString());
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleUpdateStatus = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const form = document.getElementById('update_status') as HTMLFormElement;
            const formData = new FormData(form);

            let statusData: Record<string, any> = {};

            formData.forEach((value, key) => {
                statusData[key] = value;
            });

            let data: Record<string, any> = {
                process: {
                    status: statusData
                }
            };

            dispatch(updateStatus(data));
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