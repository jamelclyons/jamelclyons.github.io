import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';
import DocumentURL from '@/model/DocumentURL';
import ContentURL from './ContentURL';

export type ProjectProblemObject = {
  gallery: GalleryObject | null;
  content_url: string | null;
  whitepaper_url: string | null;
};

export type ProjectProblemDataObject = {
  gallery: GalleryObject | null;
  content_url: string | null;
  whitepaper_url: string | null;
};

class ProjectProblem extends Model {
  gallery: Gallery | null;
  contentURL: ContentURL | null;
  whitepaperURL: DocumentURL | null;

  constructor(data: Record<string, any> | ProjectProblemDataObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.whitepaperURL = data?.whitepaper_url
      ? new DocumentURL(data.whitepaper_url)
      : null;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setWhitepaperURL(url: string) {
    this.whitepaperURL = new DocumentURL(url);
  }

  toProjectProblemObject(): ProjectProblemObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      whitepaper_url: this.whitepaperURL ? this.whitepaperURL.url : null,
    };
  }

  toProjectProblemDataObject(): ProjectProblemDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      whitepaper_url: this.whitepaperURL?.url ? this.whitepaperURL.url : null,
    };
  }
}

export default ProjectProblem;
