import Model from './Model';
import Image from './Image';

class ProjectUrl extends Model {
  name: string;
  url: string;
  image: Image;

  constructor(name: string, url: string, image: Record<string, any>) {
    super();
    
    this.name = name;
    this.url = url;
    this.image = new Image(image);
  }
}

export default ProjectUrl;
