import React from 'react';

import Task from '../../../model/Task';

interface CheckListProps {
  tasks: Array<Task>
}

const CheckList: React.FC<CheckListProps> = ({ tasks }) => {

  return (
    <>
      {tasks ? (
        <div className="checklist">
          {Array.isArray(tasks) &&
            tasks.map((task, index) => (
              <span className='task' key={index}>
                <input
                  type="checkbox"
                  name={`task_${index}`}
                  id={`task_${index}`}
                  checked={task.status}
                  disabled
                />
                {task.details ?
                  (<a className='task-details' href={task.details} target="_blank">
                    <h5>{task.description}</h5>
                  </a>) :
                  <h5>{task.description}</h5>}
              </span>
            ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default CheckList;
