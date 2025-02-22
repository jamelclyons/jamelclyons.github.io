import Model from './Model';
import Gallery from './Gallery';

class ProjectProblem extends Model {
  contentURL: string | null;
  gallery: Gallery;

  constructor(data: Record<string, any> = {}) {
    super();

    this.contentURL = data?.content_url || null;
    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery;
  }
}

export default ProjectProblem;
