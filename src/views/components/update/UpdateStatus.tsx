import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectStatus from '../../../model/ProjectStatus';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '../../../controllers/messageSlice';

const UpdateStatus: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { status } = useSelector(
        (state: RootState) => state.project
    );

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

    const handleUpdateSolution = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const form = document.getElementById('add_project') as HTMLFormElement;
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

    return (<>
        <h2 className="title">status</h2>

        <form action="">
            <input type="number" value={status} placeholder="Progress # 0-100" onChange={handleChange} />
            
            <button onClick={handleUpdateSolution}>
                <h3>update</h3>
            </button>
        </form>
    </>
    )
}

export default UpdateStatus