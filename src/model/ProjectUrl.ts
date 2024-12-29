import Image from './Image';

class ProjectUrl {
  name: string;
  url: string;
  image: Image;

  constructor(name: string, url: string, image: Record<string, any>) {
    this.name = name;
    this.url = url;
    this.image = new Image(image);
  }
}

export default ProjectUrl;
