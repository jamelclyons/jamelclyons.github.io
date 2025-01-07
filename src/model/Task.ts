import Model from './Model';

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
