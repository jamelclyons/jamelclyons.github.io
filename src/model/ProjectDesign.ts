import Model from './Model';
import Gallery from './Gallery';
import Task from './Task';
import Color from './Color';

class ProjectDesign extends Model {
  gallery: Gallery;
  checkList: Array<Task>;
  colorsList: Array<Color>;
  content: string | null;

  constructor(data: Record<string, any> = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.checkList = data?.check_list ? this.toArrayTask(data.check_list) : [];
    this.colorsList = data?.colors_list
      ? this.toArrayColor(data.colors_list)
      : [];
    this.content = data?.content || null;
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
