import React, { useEffect, useState } from 'react';

import Task from '@/model/Task';
import CheckList from '@/model/CheckList';
import TaskComponent from './TaskComponent';

interface CheckListProps {
  checkList: CheckList;
}

const CheckListComponent: React.FC<CheckListProps> = ({ checkList }) => {
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Set<Task> | null>(null);

  useEffect(() => { setId(checkList.id) }, [checkList]);
  useEffect(() => { setTitle(checkList.title) }, [checkList]);
  useEffect(() => { setTasks(checkList.tasks) }, [checkList]);

  return (
    <>
      {tasks && tasks.size > 0 && id ? (
        <div className="checklist" >

          {title && <h4>{title}</h4>}

          {Array.from(tasks).map((task) => (
            <TaskComponent task={task} key={task.id}/>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default CheckListComponent;
