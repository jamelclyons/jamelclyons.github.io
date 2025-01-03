import Model from './Model';
import Image from './Image';

class ProjectURL extends Model {
  name: string;
  url: string;
  image: Image;

  constructor(data?: Record<string, any>) {
    super();
    
    this.name = data?.name;
    this.url = data?.url;
    this.image = new Image(data?.image);
  }
}

export default ProjectURL;
