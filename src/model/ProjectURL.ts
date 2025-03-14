import Model from './Model';
import Image, { ImageObject } from './Image';

export type ProjectURLObject = {
  name: string;
  url: string | null;
  description: string;
  image: ImageObject;
};

class ProjectURL extends Model {
  name: string;
  url: string | null;
  description: string;
  image: Image;

  constructor(data: Record<string, any> | ProjectURLObject = {}) {
    super();

    this.name = data?.name;
    this.url = data?.url ?? null;
    this.description = data?.description;
    this.image = new Image(data?.image);
  }

  setUrl(url: string) {
    this.url = url;
  }

  toProjectURLObject(): ProjectURLObject {
    return {
      name: this.name,
      url: this.url ? this.url : null,
      description: this.description,
      image: this.image.toImageObject(),
    };
  }
}

export default ProjectURL;
