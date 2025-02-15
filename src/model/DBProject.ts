import Model from './Model';

class DBProject extends Model {
  id: string;
  title: string;

  constructor(data: Record<string, any>) {
    super();

    this.id = data.id;
    this.title = data.title;
  }
}

export default DBProject;
