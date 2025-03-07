import Model from './Model';
import CheckList, { CheckListObject } from './CheckList';
import Gallery, { GalleryObject } from './Gallery';

export type ProjectDeliveryObject = {
  check_list: CheckListObject;
  gallery: GalleryObject;
  content_url: string;
};

class ProjectDelivery extends Model {
  checkList: CheckList;
  gallery: Gallery;
  contentURL: string;

  constructor(data: Record<string, any> | ProjectDeliveryObject = {}) {
    super();

    this.checkList = new CheckList(data?.check_list);
    this.gallery = new Gallery(data.gallery);
    this.contentURL = data?.content_url || '';
  }

  toProjectDeliveryObject(): ProjectDeliveryObject {
    return {
      check_list: this.checkList.toCheckListObject(),
      gallery: this.gallery.toGalleryObject(),
      content_url: this.contentURL ?? '',
    };
  }
}

export default ProjectDelivery;
