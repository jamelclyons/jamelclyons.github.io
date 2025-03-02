import React from 'react';

import Task from '../../../model/Task';

interface CheckListProps{
  tasks: Array<Task>
}

const CheckList: React.FC<CheckListProps> = ({ tasks }) => {

  return (
    <>
      {tasks ? (
        <div className="checklist">
          {Array.isArray(tasks) &&
            tasks.map((task, index) => (
              <span key={index}>
                <input
                  type="checkbox"
                  name={`task_${index}`}
                  id={`task_${index}`}
                  checked={task.status}
                  disabled
                />
                <h4>{task.description}</h4>
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
