import Model from './Model';

class Feature extends Model {
  name: string;

  constructor(data?: Record<string,any>) {
    super();
    
    this.name = data?.name ? data.name : 'Not Provided';
  }
}

export default Feature;
