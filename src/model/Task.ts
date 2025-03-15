import Model from './Model';

export type TaskObject = {
  id: string;
  description: string;
  status: boolean;
  weight: number;
};

export type TaskDataObject = {
  id: string;
  description: string;
  status: boolean;
  weight: number;
};

class Task extends Model {
  id: string;
  description: string;
  status: boolean;
  weight: number;

  constructor(data: Record<string, any> | TaskObject = {}) {
    super();

    this.id = data?.id ?? '';
    this.description = data?.description ?? '';
    this.status = data?.status ?? false;
    this.weight = data?.weight ?? 0;
  }

  toTaskObject(): TaskObject {
    return {
      id: this.id,
      description: this.description,
      status: this.status,
      weight: this.weight,
    };
  }
}

export default Task;
