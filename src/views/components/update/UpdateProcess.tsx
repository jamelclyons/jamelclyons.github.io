import React from 'react'

import ProjectProcess from '../../../model/ProjectProcess';
import UpdateStatus from './UpdateStatus';
import UpdateDesign from '../update/UpdateDesign';
import UpdateDevelopment from '../update/UpdateDevelopment';
import UpdateDelivery from '../update/UpdateDelivery';

const UpdateProcess: React.FC = () => {
    return (
        <>
            <h1 className='title'>process</h1>

            <UpdateStatus />
            
            <UpdateDesign />

            <UpdateDevelopment />

            <UpdateDelivery />
        </>)
}

export default UpdateProcess