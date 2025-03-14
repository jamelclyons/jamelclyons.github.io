import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';
import Color, { ColorObject } from './Color';
import CheckList, { CheckListObject } from './CheckList';
import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectDesignObject = {
  gallery: GalleryObject;
  check_list: CheckListObject;
  colors_list: Array<ColorObject>;
  content_url: ContentURLObject | null;
};

export type ProjectDesignDataObject = {
  gallery: GalleryObject;
  check_list: CheckListObject;
  colors_list: Array<ColorObject>;
  content_url: string | null;
};

class ProjectDesign extends Model {
  gallery: Gallery;
  checkList: CheckList;
  colorsList: Array<Color>;
  contentURL: ContentURL | null;

  constructor(data: Record<string, any> | ProjectDesignObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.checkList = new CheckList(data?.check_list);
    this.colorsList = data?.colors_list
      ? this.toArrayColor(data.colors_list)
      : [];
    this.contentURL = data?.content_url?.url
      ? new ContentURL(data.content_url.url)
      : null;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  toArrayColor(data: Array<Record<string, any>>) {
    const colorsList: Array<Color> = [];

    data.forEach((color) => {
      colorsList.push(new Color(color));
    });

    return colorsList;
  }

  toProjectDesignObject(): ProjectDesignObject {
    return {
      gallery: this.gallery.toGalleryObject(),
      check_list: this.checkList.toCheckListObject(),
      colors_list: this.colorsList.map((color) => color.toColorObject()),
      content_url: this.contentURL
        ? this.contentURL.toContentURLObject()
        : null,
    };
  }

  toProjectDesignDataObject(): ProjectDesignDataObject {
    return {
      gallery: this.gallery.toGalleryObject(),
      check_list: this.checkList.toCheckListObject(),
      colors_list: this.colorsList.map((color) => color.toColorObject()),
      content_url: this.contentURL?.url ? this.contentURL.url : null,
    };
  }
}

export default ProjectDesign;
