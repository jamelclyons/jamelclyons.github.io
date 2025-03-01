import React from 'react'

import { ColorObject } from '@/model/Color';

interface UpdateColorsListProps {
    colors: Array<ColorObject>;
}

const UpdateColorsList: React.FC<UpdateColorsListProps> = ({ colors }) => {
    return (
        <details>
            <summary>Colors</summary>
        </details>
    )
}

export default UpdateColorsList