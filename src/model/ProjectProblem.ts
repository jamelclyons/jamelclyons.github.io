import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';
import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectProblemObject = {
  content_url: ContentURLObject | null;
  gallery: GalleryObject;
};

export type ProjectProblemDataObject = {
  content_url: string | null;
  gallery: GalleryObject;
};

class ProjectProblem extends Model {
  contentURL: ContentURL | null;
  gallery: Gallery;

  constructor(data: Record<string, any> = {}) {
    super();

    this.contentURL = data?.content_url?.url
      ? new ContentURL(data.content_url.url)
      : null;
    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  toProjectProblemObject(): ProjectProblemObject {
    return {
      content_url: this.contentURL
        ? this.contentURL.toContentURLObject()
        : null,
      gallery: this.gallery.toGalleryObject(),
    };
  }

  toProjectProblemDataObject(): ProjectProblemDataObject {
    return {
      content_url: this.contentURL?.url ? this.contentURL.url : null,
      gallery: this.gallery.toGalleryObject(),
    };
  }
}

export default ProjectProblem;
