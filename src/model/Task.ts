import Model from './Model';

class Task extends Model {
  name: string;
  status: boolean;

  constructor(name: string, status: boolean) {
    super();

    this.name = name;
    this.status = status;
  }
}

export default Task;
