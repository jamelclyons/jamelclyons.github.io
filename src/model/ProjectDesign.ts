import Model from './Model';
import Gallery, { GalleryObject } from './Gallery';
import Task, { TaskObject } from './Task';
import Color, { ColorObject } from './Color';

export type ProjectDesignObject = {
  gallery: GalleryObject;
  check_list: Array<TaskObject>;
  colors_list: Array<ColorObject>;
  content_url: string;
};

class ProjectDesign extends Model {
  gallery: Gallery;
  checkList: Array<Task>;
  colorsList: Array<Color>;
  contentURL: string | null;

  constructor(data: Record<string, any> = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.checkList = data?.check_list ? this.toArrayTask(data.check_list) : [];
    this.colorsList = data?.colors_list
      ? this.toArrayColor(data.colors_list)
      : [];
    this.contentURL = data?.content_url || null;
  }

  toArrayTask(data: Array<Record<string, any>>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }

  toArrayColor(data: Array<Record<string, any>>) {
    const colorsList: Array<Color> = [];

    data.forEach((color) => {
      colorsList.push(new Color(color));
    });

    return colorsList;
  }
}

export default ProjectDesign;
