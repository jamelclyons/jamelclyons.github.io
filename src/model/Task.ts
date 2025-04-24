import Model from './Model';

export type TaskObject = {
  id: string | number;
  description: string;
  status: boolean;
  details: string;
  weight: number;
};

export type TaskDataObject = {
  id: string | number;
  description: string;
  status: boolean;
  details: string;
  weight: number;
};

class Task extends Model {
  id: string | number;
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

  setID(id: string | number) {
    this.id = id;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setStatus(status: boolean) {
    this.status = status;
  }

  setDetails(details: string) {
    this.details = details;
  }

  setWeight(weight: number) {
    this.weight = weight;
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
