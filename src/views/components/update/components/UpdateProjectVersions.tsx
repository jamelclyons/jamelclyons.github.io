import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectVersions, { ProjectVersionsObject } from '@/model/ProjectVersions'

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateVersions } from '@/controllers/updateSlice';

interface UpdateProjectVersionsProps {
    projectVersionsObject: ProjectVersionsObject
}

const UpdateProjectVersions: React.FC<UpdateProjectVersionsProps> = ({ projectVersionsObject }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [projectVersions, setProjectVersions] = useState<ProjectVersionsObject>(projectVersionsObject);
    const [currentVersion, setCurrentVersion] = useState<string>(projectVersionsObject.current);
    const [previousVersions, setPreviousVersions] = useState<Array<string>>(projectVersionsObject.previous);

    useEffect(() => {
        setProjectVersions(projectVersionsObject);
    }, [projectVersionsObject, setProjectVersions]);

    useEffect(() => {
        const updatedProjectVersions: ProjectVersionsObject = {
            current: currentVersion,
            previous: previousVersions
        };
        setProjectVersions(updatedProjectVersions);
    }, [currentVersion, previousVersions, setProjectVersions]);

    const handleCurrentVersionChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'current_version') {
                setCurrentVersion(value);
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handlePreviousVersionChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const { value, dataset } = e.target;
            const index = dataset.index ? parseInt(dataset.index, 10) : -1;

            if (index === -1) return;

            const updatedPreviousVersions = [...previousVersions];
            updatedPreviousVersions[index] = value;

            setPreviousVersions(updatedPreviousVersions);
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleUpdateCurrentVersion = () => {
        try {
            const updatedPreviousVersion = [currentVersion, ...previousVersions];

            setPreviousVersions(updatedPreviousVersion);
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleUpdateVersions = () => {
        try {
            dispatch(updateVersions(new ProjectVersions(projectVersions)));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    return (
        <div className='update'>
            <h3>Project Versions</h3>

            <form onSubmit={(e) => e.preventDefault()} id='update_gallery_logos'>
                {Array.isArray(previousVersions) && previousVersions.length > 0 && (
                    <>
                        <h4>Previous Versions</h4>

                        {previousVersions.map((version: string, index: number) => (
                            <div className="form-item" key={index}>

                                <div className="form-item-flex">
                                    <input
                                        type="text"
                                        placeholder="Versions"
                                        value={version ?? ""}
                                        name="title"
                                        data-index={index}
                                        onChange={(e) => handlePreviousVersionChange(e)}
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )}

                <hr />

                <h4>Update Current Version</h4>

                <div className="form-item-flex">
                    <input type="text" id="current_version" value={currentVersion ?? ''} placeholder='Current Project Version' name='current_version' onChange={handleCurrentVersionChange} />
                    <button type='button' onClick={handleUpdateCurrentVersion}>
                        <h3>Update Current Version</h3>
                    </button>
                </div>

                <br />

                <button type='submit' onClick={handleUpdateVersions}>
                    <h3>Update Project Versions</h3>
                </button>
            </form>
        </div>
    )
}

export default UpdateProjectVersions