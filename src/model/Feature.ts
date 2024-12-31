import Model from './Model';

class Feature extends Model {
  name: string;

  constructor(name: string) {
    super();
    
    this.name = name;
  }
}

export default Feature;
