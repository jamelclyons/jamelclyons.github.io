import Model from './Model';
import CheckList, { CheckListObject } from './CheckList';
import Gallery, { GalleryObject } from './Gallery';
import ContentURL from './ContentURL';

export type ProjectDeliveryObject = {
  check_list: CheckListObject | null;
  gallery: GalleryObject | null;
  content_url: string | null;
};

export type ProjectDeliveryDataObject = {
  check_list: CheckListObject | null;
  gallery: GalleryObject | null;
  content_url: string | null;
};

class ProjectDelivery extends Model {
  checkList: CheckList | null;
  gallery: Gallery | null;
  contentURL: ContentURL | null;

  constructor(data: Record<string, any> | ProjectDeliveryObject = {}) {
    super();

    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  toProjectDeliveryObject(): ProjectDeliveryObject {
    return {
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }

  toProjectDeliveryDataObject(): ProjectDeliveryDataObject {
    return {
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }
}

export default ProjectDelivery;
