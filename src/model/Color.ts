import Model from './Model';

class Color extends Model {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    super();
    
    this.name = name;
    this.color = color;
  }
}

export default Color;
