import React from 'react';

import { FeatureObject } from '@/model/Feature';

interface UpdateFeaturesProps {
    features: Array<FeatureObject>;
}

const UpdateFeatures: React.FC<UpdateFeaturesProps> = ({ features }) => {
    console.log(features)
    return (
        <div className="update" id="update_features">
            <h3>Features</h3>

            <hr />

            <h4>Add New Feature</h4>

            <div className="form-item">
                <label htmlFor=""></label>

            </div>
        </div>
    )
}

export default UpdateFeatures