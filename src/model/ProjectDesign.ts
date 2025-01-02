import Model from './Model';
import Gallery from './Gallery';
import Task from './Task';
import Color from './Color';

class ProjectDesign extends Model {
  content: Array<string>;
  checkList: Array<Task>;
  gallery: Gallery;
  colorsList: Array<Color>;

  constructor(data: Record<string, any> = {}) {
    super();

    this.content = data?.content || [];
    this.checkList = data?.check_list || [];
    this.gallery = data?.gallery ? new Gallery(data?.gallery) : new Gallery;
    this.colorsList = data?.colors_list || [];
  }
}

export default ProjectDesign;
