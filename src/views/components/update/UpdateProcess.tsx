import React from 'react'

import ProjectProcess from '../../../model/ProjectProcess';
import UpdateStatus from './UpdateStatus';
import UpdateDesign from '../update/UpdateDesign';
import UpdateDevelopment from '../update/UpdateDevelopment';
import UpdateDelivery from '../update/UpdateDelivery';

interface UpdateProcessProps {
    projectID: string;
}

const UpdateProcess: React.FC<UpdateProcessProps> = ({ projectID }) => {
    return (
        <>
            <h1 className='title'>process</h1>

            <UpdateStatus projectID={projectID} />

            <UpdateDesign projectID={projectID} />

            <UpdateDevelopment projectID={projectID} />

            <UpdateDelivery projectID={projectID} />
        </>)
}

export default UpdateProcess