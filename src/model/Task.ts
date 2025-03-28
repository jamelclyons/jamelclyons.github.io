import Model from './Model';

export type TaskObject = {
  id: string;
  description: string;
  status: boolean;
  details: string;
  weight: number;
};

export type TaskDataObject = {
  id: string;
  description: string;
  status: boolean;
  details: string;
  weight: number;
};

class Task extends Model {
  id: string;
  description: string;
  status: boolean;
  details: string;
  weight: number;

  constructor(data: Record<string, any> | TaskObject = {}) {
    super();

    this.id = data?.id ?? '';
    this.description = data?.description ?? '';
    this.status = data?.status ?? false;
    this.details = data?.details ?? '';
    this.weight = data?.weight ?? 0;
  }

  toTaskObject(): TaskObject {
    return {
      id: this.id,
      description: this.description,
      status: this.status,
      details: this.details,
      weight: this.weight,
    };
  }
}

export default Task;
