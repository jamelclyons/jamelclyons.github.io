import React, { useEffect, useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/model/store';

import Feature, { FeatureObject } from '@/model/Feature';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateFeatures } from '@/controllers/updateSlice';

interface UpdateFeaturesProps {
    featuresObject: Array<FeatureObject>;
}

const UpdateFeatures: React.FC<UpdateFeaturesProps> = ({ featuresObject }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [features, setFeatures] = useState<Array<Feature>>(featuresObject.map((feature) => new Feature(feature)));
    const [feature, setFeature] = useState<Feature>(new Feature());

    const handleChange = (e: ChangeEvent<HTMLInputElement>, feature: Feature) => {
        const { name, value } = e.target;

        const updatedFeatures = features.map((f) =>
            f.id === feature.id ? new Feature({ ...feature, [name]: value }) : f
        );

        setFeatures(updatedFeatures);
    };

    const handleFeatureChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let id = feature.id !== '' ? feature.id : crypto.randomUUID();
        let description = feature.description;

        if (name === 'description') {
            description = value;
        }

        let featureObject: FeatureObject = {
            id: id,
            description: description
        }

        setFeature(new Feature(featureObject));
    };

    const handleAddFeature = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (!feature.description.trim()) {
                throw new Error('A description is required');
            }

            setFeatures(prevFeatures => {
                const updatedFeatures = [...prevFeatures, feature];
                dispatch(updateFeatures(updatedFeatures));
                return updatedFeatures;
            });

            setFeature(new Feature());
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    const handleUpdateFeatures = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (features.length === 0) {
                throw new Error('No features added');
            }

            dispatch(updateFeatures(features));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <div className="update" id="update_features">
            <h3>Features</h3>

            {features.map((feature) => (
                <div className="form-item" key={feature.id}>
                    <div className="form-item-flex">
                        <label htmlFor="">ID:</label>
                        <h3>{feature.id}</h3>
                    </div>

                    <div className="form-item-flex">
                        <label htmlFor="">Feature</label>
                        <input type="text" value={feature.description} placeholder='Description' name='description' onChange={(e) => handleChange(e, feature)} />
                    </div>
                </div>
            ))}

            <hr />

            <h4>Add New Feature</h4>

            <div className="form-item">
                <div className="form-item-flex">
                    <label htmlFor="">ID:</label>
                    <h3>{feature.id}</h3>
                </div>

                <div className="form-item-flex">
                    <label htmlFor="">Feature</label>
                    <input type="text" value={feature.description} placeholder='Description' name='description' onChange={handleFeatureChange} />
                </div>

                <button onClick={handleAddFeature}>
                    <h3>Add Feature</h3>
                </button>
            </div>

            <button onClick={handleUpdateFeatures}>
                <h3>Update Features</h3>
            </button>
        </div>
    )
}

export default UpdateFeatures