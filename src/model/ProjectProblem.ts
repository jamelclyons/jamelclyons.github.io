import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';
import DocumentURL, { DocumentURLObject } from '@/model/DocumentURL';
import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectProblemObject = {
  gallery: GalleryObject;
  content_url: ContentURLObject | null;
  whitepaper_url: DocumentURLObject | null;
};

export type ProjectProblemDataObject = {
  gallery: GalleryObject;
  content_url: ContentURLObject | null;
  whitepaper_url: string | null;
};

class ProjectProblem extends Model {
  gallery: Gallery;
  contentURL: ContentURL | null;
  whitepaperURL: DocumentURL | null;

  constructor(data: Record<string, any> = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.contentURL = data?.content_url?.url
      ? new ContentURL(data.content_url.url)
      : null;
    this.whitepaperURL = data?.whitepaper_url?.url
      ? new DocumentURL(data.whitepaper_url.url)
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
      gallery: this.gallery.toGalleryObject(),
      content_url: this.contentURL
        ? this.contentURL.toContentURLObject()
        : null,
      whitepaper_url: this.whitepaperURL
        ? this.whitepaperURL.toDocumentURLObject()
        : null,
    };
  }

  toProjectProblemDataObject(): ProjectProblemDataObject {
    return {
      gallery: this.gallery.toGalleryObject(),
      content_url: this.contentURL
        ? this.contentURL.toContentURLObject()
        : null,
      whitepaper_url: this.whitepaperURL?.url ? this.whitepaperURL.url : null,
    };
  }
}

export default ProjectProblem;
