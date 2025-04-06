import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';
import Color, { ColorObject } from './Color';
import CheckList, { CheckListObject } from './CheckList';
import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectDesignObject = {
  gallery: GalleryObject | null;
  check_list: CheckListObject | null;
  colors_list: Array<ColorObject> | null;
  content_url: string | null;
};

export type ProjectDesignDataObject = {
  gallery: GalleryObject | null;
  check_list: CheckListObject | null;
  colors_list: Array<ColorObject> | null;
  content_url: string | null;
};

class ProjectDesign extends Model {
  gallery: Gallery | null;
  checkList: CheckList | null;
  colorsList: Array<Color> | null;
  contentURL: ContentURL | null;

  constructor(data: Record<string, any> | ProjectDesignObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.colorsList = data?.colors_list
      ? this.toArrayColor(data.colors_list)
      : null;
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
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      colors_list: this.colorsList
        ? this.colorsList.map((color) => color.toColorObject())
        : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }

  toProjectDesignDataObject(): ProjectDesignDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      colors_list: this.colorsList
        ? this.colorsList.map((color) => color.toColorObject())
        : null,
      content_url: this.contentURL?.url ? this.contentURL.url : null,
    };
  }
}

export default ProjectDesign;
