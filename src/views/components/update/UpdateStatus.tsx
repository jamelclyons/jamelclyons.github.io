import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';
import ProjectStatus from '../../../model/ProjectStatus';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '../../../controllers/messageSlice';
import { updateStatus } from '../../../controllers/updateSlice';

interface UpdateStatusProps {
    projectID: string;
    projectDataObject: Record<string, any>;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ projectID, projectDataObject }) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const [status, setStatus] = useState<ProjectStatus>(new ProjectStatus(projectDataObject?.process?.status))
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
                id: projectID,
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
            <input type="number" value={progress} placeholder="Progress # 0-100" onChange={handleChange} id='progress' name='progress' />

            <button onClick={handleUpdateStatus}>
                <h3>update</h3>
            </button>
        </form>
    </>
    )
}

export default UpdateStatus