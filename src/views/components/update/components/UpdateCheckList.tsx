import React from 'react';

import { TaskObject } from '@/model/Task';

interface UpdateCheckListProps {
    checkList: Array<TaskObject>
}

const UpdateCheckList: React.FC<UpdateCheckListProps> = ({ checkList }) => {
    return (
        <details>
            <summary>Check List</summary>
        </details>
    )
}

export default UpdateCheckList;