class Task {
  name: string;
  status: boolean;

  constructor(name: string, status: boolean) {
    this.name = name;
    this.status = status;
  }

  toObject(): Record<string, any> {
    return {
      name: this.name,
      status: this.status,
    };
  }
}

export default Task;
