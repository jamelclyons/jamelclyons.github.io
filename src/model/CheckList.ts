import Model from './Model';
import Task, { TaskObject } from './Task';

export interface CheckListObject {
  tasks: Array<TaskObject>;
}

class CheckList extends Model {
  tasks: Set<Task>;
  totalWeight: number;

  constructor(data: Record<string, any> | CheckListObject = {}) {
    super();

    if (data?.tasks && Array.isArray(data?.tasks)) {
      this.tasks = this.getTasks(data.tasks);
      this.totalWeight = this.getTotalWeight(data.tasks);
    } else {
      this.tasks = new Set<Task>();
      this.totalWeight = 0;
    }
  }

  getTasks(data: Array<Record<string, any>> | Array<TaskObject>) {
    const tasks: Set<Task> = new Set();

    if (Array.isArray(data) && data.length > 0) {
      const taskArray = data.map((task) => new Task(task));

      taskArray.forEach((task) => {
        tasks.add(task);
      });
    }

    return tasks;
  }

  getTotalWeight(data: Array<Record<string, any>> | Array<TaskObject>): number {
    if (!Array.isArray(data) || data.length === 0) return 0;

    let totalWeight = 0;

    data.forEach((task) => {
      totalWeight += task.weight;
    });

    return totalWeight;
  }

  addTasks(tasks: Set<Task>) {
    this.tasks = tasks;

    let totalWeight = 0;

    tasks.forEach((task) => {
      totalWeight += task.weight;
    });

    this.totalWeight = totalWeight;
  }

  toCheckListObject(): CheckListObject {
    const taskArray = Array.from(this.tasks);

    return {
      tasks: taskArray.map((task) => task.toTaskObject()),
    };
  }
}

export default CheckList;

export const existsInSet = (task: Task, set: Set<Task>) => {
  const map = new Map(Array.from(set).map((task) => [task.id, task]));

  return map.has(task.id);
};
