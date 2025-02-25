import Model from './Model';
import Image, { ImageObject } from './Image';

export type ProjectURLObject = {
  name: string;
  url: string;
  description: string;
  image: ImageObject;
};

class ProjectURL extends Model {
  name: string;
  url: string;
  description: string;
  image: Image;

  constructor(data: Record<string, any> | ProjectURLObject = {}) {
    super();

    this.name = data?.name;
    this.url = data?.url;
    this.description = data?.description;
    this.image = new Image(data?.image);
  }
}

export default ProjectURL;
