import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectURLs, { ProjectURLsObject } from '@/model/ProjectURLs';
import { ProjectURLObject } from '@/model/ProjectURL';

import { updateProjectURLs } from '@/controllers/updateSlice';
import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';

interface UpdateProjectURLProps {
    projectURLsObject: ProjectURLsObject
}

const UpdateProjectURL: React.FC<UpdateProjectURLProps> = ({ projectURLsObject }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [projectURLs, setProjectURLs] = useState<ProjectURLsObject>(projectURLsObject);
    const [homepage, setHomepage] = useState<ProjectURLObject>(projectURLsObject.homepage);
    const [ios, setIos] = useState<ProjectURLObject>(projectURLsObject.ios);
    const [android, setAndroid] = useState<ProjectURLObject>(projectURLsObject.android);

    useEffect(() => {
        setProjectURLs(projectURLsObject);
    }, [projectURLsObject, setProjectURLs]);

    useEffect(() => {
        setHomepage(projectURLsObject.homepage);
    }, [projectURLsObject, setHomepage]);

    useEffect(() => {
        setIos(projectURLs.ios);
    }, [projectURLs.ios, setIos]);

    useEffect(() => {
        setAndroid(projectURLs.android);
    }, [projectURLs.android, setAndroid]);

    const handleHomepageChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'homepage_url') {
                setHomepage({ ...homepage, url: value });

                const updatedProjectURLs: ProjectURLsObject = {
                    homepage: { ...homepage, url: value },
                    ios: ios,
                    android: android
                };

                dispatch(updateProjectURLs(new ProjectURLs(updatedProjectURLs)));
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleIosChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'ios_url') {
                setIos({ ...ios, url: value });

                const updatedProjectURLs: ProjectURLsObject = {
                    homepage: homepage,
                    ios: { ...ios, url: value },
                    android: android
                };

                dispatch(updateProjectURLs(new ProjectURLs(updatedProjectURLs)));
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    const handleAndroidChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'android_url') {
                setAndroid({ ...android, url: value });

                const updatedProjectURLs: ProjectURLsObject = {
                    homepage: homepage,
                    ios: ios,
                    android: { ...android, url: value }
                };

                dispatch(updateProjectURLs(new ProjectURLs(updatedProjectURLs)));
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };

    return (
        <>
            <h3>Project URLs</h3>

            {homepage &&
                (<div className="form-item-flex">
                    <label htmlFor="homepage_url">{homepage.name}:</label>
                    <input type="text" id="homepage" value={homepage.url ?? ''} placeholder={homepage.description} name='homepage_url' onChange={handleHomepageChange} />
                </div>)
            }

            {ios &&
                (<div className="form-item-flex">
                    <label htmlFor="ios_url">{ios.name}:</label>
                    <input type="text" id="ios" value={ios.url ?? ''} placeholder={ios.description} name='ios_url' onChange={handleIosChange} />
                </div>)
            }

            {android &&
                (<div className="form-item-flex">
                    <label htmlFor="android_url">{android.name}:</label>
                    <input type="text" id="android" value={android.url ?? ''} placeholder={android.description} name='android_url' onChange={handleAndroidChange} />
                </div>)
            }
        </>
    )
}

export default UpdateProjectURL