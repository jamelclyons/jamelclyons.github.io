import React, { useEffect, useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/model/store';

import Task, { TaskObject } from '@/model/Task';
import CheckList, { CheckListObject, existsInSet } from '@/model/CheckList';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateDesignCheckList, updateDevelopmentCheckList, updateDeliveryCheckList } from '@/controllers/updateSlice';

interface UpdateCheckListProps {
    location: string;
    checkList: CheckList;
}

const UpdateCheckList: React.FC<UpdateCheckListProps> = ({ location, checkList }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [checkListObject, setCheckListObject] = useState<CheckListObject>(checkList.toCheckListObject());

    const [tasks, setTasks] = useState<Set<Task>>(checkList.tasks);
    const [task, setTask] = useState<Task>(new Task());
    const [selectedTasks, setSelectedTasks] = useState<Set<Task>>(Array.isArray(checkListObject.tasks) && checkListObject.tasks.length > 0 ? new Set(checkListObject.tasks.map((task) => new Task(task))) : new Set());

    useEffect(() => {
        setCheckListObject(checkList.toCheckListObject());
    }, [checkList, setCheckListObject]);

    useEffect(() => {
        setSelectedTasks(new Set(checkListObject.tasks.map((task) => new Task(task))));
    }, [checkListObject, setSelectedTasks]);

    useEffect(() => {
        setSelectedTasks(selectedTasks);
    }, [selectedTasks, setSelectedTasks]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        task: Task
    ) => {
        const { name, value, checked } = e.target;

        let description = task.description;
        let status = task.status;
        let weight = task.weight;

        const taskRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-task$/;
        const statusRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-status$/;
        const weightRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-weight$/;

        if (taskRegex.test(name)) {
            description = value;
        }

        if (statusRegex.test(name)) {
            status = checked;
        }

        if (weightRegex.test(name)) {
            weight = parseInt(value);
        }

        const updatedTasks = Array.from(selectedTasks).map((t) =>
            t.id === task.id ?
                new Task({
                    id: task.id,
                    description: description,
                    status: status,
                    weight: weight
                }) : t
        );

        setSelectedTasks(new Set(updatedTasks));
        checkList.addTasks(new Set(updatedTasks));
        setCheckListObject(checkList.toCheckListObject())
    };

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        let id = task.id !== '' ? task.id : crypto.randomUUID();
        let description = task.description;
        let status = task.status;
        let weight = task.weight;

        if (name === 'description') {
            description = value;
        }

        if (name === 'status') {
            status = checked;
        }

        if (name === 'weight') {
            weight = parseInt(value);
        }

        let taskObject: TaskObject = {
            id: id,
            description: description,
            status: status,
            weight: weight
        }

        setTask(new Task(taskObject))
    }

    const handleAddToCheckList = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (task.description !== '') {
                setTasks((prevTasks) => {
                    const exists = existsInSet(task, tasks);
                    return exists ? new Set(Array.from(prevTasks).filter((t) => t.id !== task.id)) : prevTasks.add(task);
                });
                checkList.addTasks(tasks)
                setCheckListObject(checkList.toCheckListObject())
                setSelectedTasks(checkList.tasks)
                setTask(new Task());
            } else {
                throw new Error('A description is required')
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    const handleUpdateTasks = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (location === 'design') {
                dispatch(updateDesignCheckList(checkList));
            }

            if (location === 'development') {
                dispatch(updateDevelopmentCheckList(checkList));
            }

            if (location === 'delivery') {
                dispatch(updateDeliveryCheckList(checkList));
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }

    return (
        <details>
            <summary>Check List</summary>

            <br />

            <div className="update">

                {selectedTasks.size > 0 ? (Array.from(selectedTasks).map((task) => (
                    <div className="form-item" key={task.id}>
                        <div className="form-item-flex">
                            <label htmlFor={`${task.id}-status`}>Status:</label>
                            <input
                                type="checkbox"
                                placeholder="Status"
                                checked={task.status}
                                name={`${task.id}-status`}
                                onChange={(e) => handleChange(e, task)}
                            />
                        </div>
                        <div className="form-item-flex">
                            <label htmlFor={`${task.id}-ID`}>ID:</label>
                            <input
                                type="text"
                                placeholder="ID"
                                value={task.id ?? ""}
                                name={`${task.id}-ID`}
                                disabled
                            />
                        </div>
                        <div className="form-item-flex">
                            <label htmlFor={`${task.id}-task`}>Task:</label>
                            <input
                                type="text"
                                placeholder="Task"
                                value={task.description}
                                name={`${task.id}-task`}
                                onChange={(e) => handleChange(e, task)}
                            />
                        </div>
                        <div className='form-item-flex'>
                            <label htmlFor={`${task.weight}-weight`}>Weignt:</label>
                            <input
                                type="number"
                                name={`${task.id}-weight`}
                                value={task.weight}
                                onChange={(e) => handleChange(e, task)}
                            />
                        </div>
                    </div>)
                )) : (<h3>There are no {location} task at this time.</h3>)}

                <form action="">
                    <hr />

                    <h4>Add Task</h4>

                    <div className='form-item'>
                        <div className='form-item-flex'>
                            <label htmlFor="status">Status:</label>
                            <input type="checkbox" name='status' checked={task.status} onChange={handleTaskChange} />
                        </div>

                        <div className='form-item-flex'>
                            <label htmlFor="description">Description:</label>
                            <input type="text" name='description' value={task.description} onChange={handleTaskChange} />
                        </div>

                        <div className='form-item-flex'>
                            <label htmlFor="weight">Weignt:</label>
                            <input type="number" name='weight' value={task.weight} onChange={handleTaskChange} />
                        </div>

                        <button type="submit" onClick={handleAddToCheckList}>
                            <h3>Add Task</h3>
                        </button>
                    </div>
                </form>

                <hr />

                <button type="button" onClick={handleUpdateTasks}><h3>Update Tasks</h3></button>
            </div>
        </details>
    )
}

export default UpdateCheckList;
