import React, { useEffect, useState, ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../../model/store';

import ProjectStatus from '../../../model/ProjectStatus';

function UpdateStatus() {
    const dispatch = useDispatch<AppDispatch>();

    const status = new ProjectStatus();

    return (
        <div>UpdateStatus</div>
    )
}

export default UpdateStatus