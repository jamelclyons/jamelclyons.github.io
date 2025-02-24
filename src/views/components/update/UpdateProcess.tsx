import React from 'react'

import { ProjectObject } from '@/model/Project';

import UpdateStatus from './UpdateStatus';
import UpdateDesign from '../update/UpdateDesign';
import UpdateDevelopment from '../update/UpdateDevelopment';
import UpdateDelivery from '../update/UpdateDelivery';

interface UpdateProcessProps {
    projectObject: ProjectObject;
}

const UpdateProcess: React.FC<UpdateProcessProps> = ({ projectObject }) => {

    return (
        <>
            <h1 className='title'>process</h1>

            <UpdateStatus projectObject={projectObject} />

            <UpdateDesign projectObject={projectObject} />

            <UpdateDevelopment projectObject={projectObject} />

            <UpdateDelivery projectObject={projectObject} />

            <button>
                <h3>UPDATE PROCESS</h3>
            </button>
        </>
    )
}

export default UpdateProcess