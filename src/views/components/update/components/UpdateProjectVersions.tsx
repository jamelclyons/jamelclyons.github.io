import React from 'react'

import { ProjectVersionsObject } from '@/model/ProjectVersions'

interface UpdateProjectVersionsProps {
    projectVersions: ProjectVersionsObject
}

const UpdateProjectVersions: React.FC<UpdateProjectVersionsProps> = ({ projectVersions }) => {
    return (
        <div>UpdateProjectVersions</div>
    )
}

export default UpdateProjectVersions