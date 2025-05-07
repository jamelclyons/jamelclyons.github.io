import React from 'react'

import Task from '@/model/Task'

import TaskCheckbox from './TaskCheckbox';
import TaskDescription from './TaskDescription';

type TaskComponentProps = {
    task: Task;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
    return (
        <>
            <div className='task' key={task.id}>
                <span className='task-row'>
                    <TaskCheckbox task={task} />
                    <TaskDescription task={task} />
                </span>

                {task.subTasks && Array.isArray(task.subTasks) &&
                    task.subTasks.length > 0 &&
                    <div className='sub-task'>
                        {task.subTasks.map((task) => (
                            <span className='task-row' key={task.id}>
                                <TaskCheckbox task={task} />
                                <TaskDescription task={task} />
                            </span>
                        ))}
                    </div>}
            </div>
        </>
    )
}

export default TaskComponent;