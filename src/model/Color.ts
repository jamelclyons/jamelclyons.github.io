import Model from './Model';

class Color extends Model {
  name: string;
  color: string;

  constructor(data: Record<string, any>) {
    super();

    this.name = data?.name;
    this.color = data?.color;
  }
}

export default Color;
