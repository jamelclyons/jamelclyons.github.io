import React from 'react';

import { FeatureObject } from '@/model/Feature';

interface UpdateFeaturesProps {
    features: Array<FeatureObject>;
}

const UpdateFeatures: React.FC<UpdateFeaturesProps> = ({ features }) => {
    return (
        <details>
            <summary>Features</summary>
        </details>
    )
}

export default UpdateFeatures