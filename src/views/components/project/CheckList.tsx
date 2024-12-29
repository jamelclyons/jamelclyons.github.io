import React from 'react';

import Task from '../../../model/Task';

interface CheckListProps{
  checkList: Array<Task>
}

const CheckList: React.FC<CheckListProps> = ({ checkList }) => {

  return (
    <>
      {checkList ? (
        <div className="checklist">
          {Array.isArray(checkList) &&
            checkList.map((task, index) => (
              <span key={index}>
                <input
                  type="checkbox"
                  name={`task_${index}`}
                  id={`task_${index}`}
                  checked={task.status}
                  disabled
                />
                <h4>{task.name}</h4>
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
