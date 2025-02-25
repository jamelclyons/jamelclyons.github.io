import React from 'react';

import { TaskObject } from '@/model/Task';

interface UpdateCheckListProps {
    checkList: Array<TaskObject>
}

const UpdateCheckList: React.FC<UpdateCheckListProps> = ({ checkList }) => {
    return (
        <>
            <h1>UpdateCheckList</h1>
        </>
    )
}

export default UpdateCheckList;