import React from 'react'

import Task from '@/model/Task'

type TaskDescriptionProps = {
    task: Task;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
    return (<>
        {task.link ?
            (<a className='task-details' href={`/#/portfolio/${task.link}`} target="_blank">
                <h5>{task.description}</h5>
            </a>) :
            <h5>{task.description}</h5>}
    </>
    )
}

export default TaskDescription