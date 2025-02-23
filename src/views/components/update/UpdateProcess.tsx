import React, { useState } from 'react'

import ProjectProcess from '../../../model/ProjectProcess';
import UpdateStatus from './UpdateStatus';
import UpdateDesign from '../update/UpdateDesign';
import UpdateDevelopment from '../update/UpdateDevelopment';
import UpdateDelivery from '../update/UpdateDelivery';

interface UpdateProcessProps {
    projectID: string;
    projectDataObject: Record<string, any>;
}

const UpdateProcess: React.FC<UpdateProcessProps> = ({ projectID, projectDataObject }) => {
    
    return (
        <>
            <h1 className='title'>process</h1>

            <UpdateStatus projectID={projectID} projectDataObject={projectDataObject} />

            <UpdateDesign projectID={projectID} projectDataObject={projectDataObject} />

            <UpdateDevelopment projectID={projectID} projectDataObject={projectDataObject} />

            <UpdateDelivery projectID={projectID} projectDataObject={projectDataObject} />
        </>)
}

export default UpdateProcess