import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';
import DocumentURL, { DocumentURLObject } from '@/model/DocumentURL';

export type ProjectProblemObject = {
  whitepaper_url: DocumentURLObject | null;
  gallery: GalleryObject;
};

export type ProjectProblemDataObject = {
  whitepaper_url: string | null;
  gallery: GalleryObject;
};

class ProjectProblem extends Model {
  whitepaperURL: DocumentURL | null;
  gallery: Gallery;

  constructor(data: Record<string, any> = {}) {
    super();

    this.whitepaperURL = data?.whitepaper_url
      ? new DocumentURL(data.whitepaper_url)
      : null;
    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
  }

  setContentURL(url: string) {
    this.whitepaperURL = new DocumentURL(url);
  }

  toProjectProblemObject(): ProjectProblemObject {
    return {
      whitepaper_url: this.whitepaperURL
        ? this.whitepaperURL.toDocumentURLObject()
        : null,
      gallery: this.gallery.toGalleryObject(),
    };
  }

  toProjectProblemDataObject(): ProjectProblemDataObject {
    return {
      whitepaper_url: this.whitepaperURL?.url ? this.whitepaperURL.url : null,
      gallery: this.gallery.toGalleryObject(),
    };
  }
}

export default ProjectProblem;
