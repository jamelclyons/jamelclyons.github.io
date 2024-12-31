import Model from './Model';
import Gallery from './Gallery';

class ProjectDesign extends Model {
  content: Array<string> = [];
  checkList: Array<string> = [];
  gallery: Gallery;
  colorsList: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    super();

    this.content = data?.content || [];
    this.checkList = data?.check_list || [];
    this.gallery = new Gallery(data?.gallery);
    this.colorsList = data?.colors_list || [];
  }
}

export default ProjectDesign;
