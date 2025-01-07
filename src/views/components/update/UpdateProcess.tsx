import React from 'react'

import ProjectProcess from '../../../model/ProjectProcess';
import UpdateStatus from './UpdateStatus';
import UpdateDesign from '../update/UpdateDesign';
import UpdateDevelopment from '../update/UpdateDevelopment';
import UpdateDelivery from '../update/UpdateDelivery';

interface UpdateProcessProps {
    projectID: string;
    process: ProjectProcess;
}

const UpdateProcess: React.FC<UpdateProcessProps> = ({ projectID, process }) => {
    const { status, design, development, delivery } = process;

    return (
        <>
            <h1 className='title'>process</h1>

            <UpdateStatus projectID={projectID} status={status} />

            <UpdateDesign projectID={projectID} design={design} />

            <UpdateDevelopment projectID={projectID} development={development} />

            <UpdateDelivery projectID={projectID} delivery={delivery} />
        </>)
}

export default UpdateProcess