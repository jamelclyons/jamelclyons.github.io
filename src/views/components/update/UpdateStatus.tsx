import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '../../../controllers/messageSlice';

import { updateStatus } from '../../../controllers/updateSlice';

interface UpdateStatusProps {
    projectID: string;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ projectID }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { status } = useSelector(
        (state: RootState) => state.project
    );
    const { updateLoading, updateErrorMessage, updateSuccessMessage } = useSelector(
        (state: RootState) => state.update
    );

    useEffect(() => {
        if (updateLoading) {
            dispatch(setMessage('Standbye while an attempt to update the status information of your project is made.'));
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

    const [progress, setProgress] = useState(status?.progress);

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
                status: statusData
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
            <input type="number" value={progress ? parseFloat(progress) : 0} placeholder="Progress # 0-100" onChange={handleChange} />

            <button onClick={handleUpdateStatus}>
                <h3>update</h3>
            </button>
        </form>
    </>
    )
}

export default UpdateStatus