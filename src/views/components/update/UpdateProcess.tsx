import React from 'react'

import ProjectProcess from '../../../model/ProjectProcess';
import UpdateDesign from '../update/UpdateDesign';
import UpdateDevelopment from '../update/UpdateDevelopment';
import UpdateDelivery from '../update/UpdateDelivery';

function UpdateProcess() {
    return (
        <>
            <h1 className='title'>process</h1>

            <h2 className="title">design</h2>
            <UpdateDesign />

            <h2 className="title">development</h2>
            <UpdateDevelopment />

            <h2 className="title">delivery</h2>
            <UpdateDelivery />
        </>)
}

export default UpdateProcess