import React, { useEffect, useState } from 'react';

import Task from '@/model/Task';
import CheckList from '@/model/CheckList';

interface CheckListProps {
  checkList: CheckList;
}

const CheckListComponent: React.FC<CheckListProps> = ({ checkList }) => {
  const [id, setId] = useState<string>(checkList.id);
  const [title, setTitle] = useState<string | null>(checkList.title);
  const [tasks, setTasks] = useState<Set<Task>>(checkList.tasks);

  useEffect(() => { setId(checkList.id) }, [checkList.id, setId]);
  useEffect(() => { setTitle(checkList.title) }, [checkList.title, setTitle]);
  useEffect(() => { setTasks(checkList.tasks) }, [checkList.tasks, setId]);

  return (
    <>
      {tasks.size > 0 ? (
        <div className="checklist" id={id}>

          {title && <h4>{title}</h4>}

          {Array.from(tasks).map((task, index) => (
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

export default CheckListComponent;
