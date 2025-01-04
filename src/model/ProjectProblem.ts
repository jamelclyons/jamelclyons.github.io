import Model from './Model';
import Image from './Image';
import Gallery from './Gallery';

class ProjectProblem extends Model {
  content: Array<string>;
  gallery: Gallery;

  constructor(data: Record<string, any> = {}) {
    super();

    this.content = data?.content || [];
    this.gallery = data?.gallery ? new Gallery(data?.gallery) : new Gallery;
  }
}

export default ProjectProblem;
