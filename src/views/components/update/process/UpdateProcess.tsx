import React from 'react'

import { ProjectObject } from '@/model/Project';

import UpdateStatus from './UpdateStatus';
import UpdateDesign from './UpdateDesign';
import UpdateDevelopment from './UpdateDevelopment';
import UpdateDelivery from './UpdateDelivery';

interface UpdateProcessProps {
    projectObject: ProjectObject;
}

const UpdateProcess: React.FC<UpdateProcessProps> = ({ projectObject }) => {
    return (
        <div className='update' id='update_process'>
            <h1 className='title'>process</h1>

            <UpdateStatus projectObject={projectObject} />

            <br />

            <UpdateDesign projectObject={projectObject} />

            <br />

            <UpdateDevelopment projectObject={projectObject} />

            <br />

            <UpdateDelivery projectObject={projectObject} />

            <br />

            <button>
                <h3>UPDATE PROCESS</h3>
            </button>
        </div>
    )
}

export default UpdateProcess