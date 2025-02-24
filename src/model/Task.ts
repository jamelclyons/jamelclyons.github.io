import Model from './Model';

export type TaskObject = { name: string; status: boolean };

class Task extends Model {
  name: string;
  status: boolean;

  constructor(data: Record<string, any>) {
    super();

    this.name = data?.name;
    this.status = data?.status;
  }
}

export default Task;
