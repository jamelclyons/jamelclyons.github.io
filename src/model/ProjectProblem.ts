import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';

export type ProjectProblemObject = {
  content_url: string;
  gallery: GalleryObject;
}

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
