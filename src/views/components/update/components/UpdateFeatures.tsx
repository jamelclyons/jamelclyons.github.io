import React from 'react';

import { FeatureObject } from '@/model/Feature';

interface UpdateFeaturesProps {
    features: Array<FeatureObject>;
}

const UpdateFeatures: React.FC<UpdateFeaturesProps> = ({ features }) => {
    return (
        <h3>Features</h3>
    )
}

export default UpdateFeatures