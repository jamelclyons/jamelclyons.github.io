import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectStatus from '../../../model/ProjectStatus';

const UpdateStatus: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const status = new ProjectStatus();

    return (
        <h2 className="title">status</h2>
    )
}

export default UpdateStatus