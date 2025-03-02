import Model from './Model';

export type ColorObject = {
  name: string;
  color: string;
};

class Color extends Model {
  name: string;
  color: string;

  constructor(data: Record<string, any>) {
    super();

    this.name = data?.name;
    this.color = data?.color;
  }

  toColorObject(): ColorObject {
    return {
      name: this.name,
      color: this.color,
    };
  }
}

export default Color;
