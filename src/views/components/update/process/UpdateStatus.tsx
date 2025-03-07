import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../../model/store';
import ProjectStatus, { ProjectStatusObject } from '../../../../model/ProjectStatus';
import Project, { ProjectObject } from '@/model/Project';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '../../../../controllers/messageSlice';
import { updateProject } from '../../../../controllers/updateSlice';
import CheckList from '@/model/CheckList';

interface UpdateStatusProps {
    project: Project;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ project }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { updatedDesignCheckList, updatedDevelopmentCheckList, updatedDeliveryCheckList } = useSelector(
        (state: RootState) => state.update
    );

    const [projectObject, setProjectObject] = useState<ProjectObject>(project.toProjectObject());

    const [status, setStatus] = useState<ProjectStatus>(project.process.status);
    const [createdAt, setCreatedAt] = useState<string>(project.process.status.createdAt);
    const [updatedAt, setUpdatedAt] = useState<string>(project.process.status.updatedAt);
    const [designCheckList, setDesignCheckList] = useState<CheckList>(project.process.design.checkList)
    const [developmentCheckList, setDevelopmentCheckList] = useState<CheckList>(project.process.development.checkList)
    const [deliveryCheckList, setDeliveryCheckList] = useState<CheckList>(new CheckList(projectObject.process.delivery.check_list))
    const [progress, setProgress] = useState<string>(projectObject.process.status.progress);

    useEffect(() => { setProjectObject(project.toProjectObject()) }, [project, setProjectObject]);

    useEffect(() => {
        setStatus(project.process.status)
    }, [project.process.status, setStatus]);

    useEffect(() => {
        if (updatedDesignCheckList) {
            setDesignCheckList(new CheckList(updatedDesignCheckList))
        }
    }, [updatedDesignCheckList, setDesignCheckList]);

    useEffect(() => {
        if (updatedDevelopmentCheckList) {
            setDevelopmentCheckList(new CheckList(updatedDevelopmentCheckList))
        }
    }, [updatedDevelopmentCheckList, setDevelopmentCheckList]);

    useEffect(() => {
        if (updatedDeliveryCheckList) {
            setDeliveryCheckList(new CheckList(updatedDeliveryCheckList))
        }
    }, [updatedDeliveryCheckList, setDeliveryCheckList]);

    useEffect(() => {
        const totalWeight =
            designCheckList.totalWeight +
            developmentCheckList.totalWeight +
            deliveryCheckList.totalWeight;

        if (totalWeight > 0) {
            const percentageComplete =
                ((designCheckList.weight +
                    developmentCheckList.weight +
                    deliveryCheckList.weight) /
                    totalWeight) * 100;

            setProgress((prev) => {
                const newProgress = percentageComplete.toString();
                return prev !== newProgress ? newProgress : prev; // Prevent unnecessary state updates
            });
        }
    }, [
        designCheckList.weight, designCheckList.totalWeight,
        developmentCheckList.weight, developmentCheckList.totalWeight,
        deliveryCheckList.weight, deliveryCheckList.totalWeight
    ]);

    useEffect(() => {
        if (status.progress !== '0') {
            setProgress(status.progress)
        }
    }, [status.progress, setProgress]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'progress') {
                setProgress(value);

                setStatus(new ProjectStatus({
                    created_at: createdAt,
                    updated_at: updatedAt,
                    progress: value
                }));
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
            const updatedProjectStatus: ProjectStatusObject = {
                created_at: createdAt,
                updated_at: updatedAt,
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

    return (
        <>
            <h2 className="title">status</h2>

            <form action="" id='update_status'>
                {/* created at */}

                {/* updated at */}

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