import React from 'react'

import { ColorObject } from '@/model/Color';

interface UpdateColorsListProps {
    colors: Array<ColorObject>;
}

const UpdateColorsList: React.FC<UpdateColorsListProps> = ({ colors }) => {
    return (
        <div>UpdateColorsList</div>
    )
}

export default UpdateColorsList