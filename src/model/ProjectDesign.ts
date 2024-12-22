import Gallery from './Gallery';

class ProjectDesign {
  content: Array<string> = [];
  checkList: Array<string> = [];
  gallery: Gallery;
  colorsList: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.content = data?.content || [];
    this.checkList = data?.check_list || [];
    this.gallery = new Gallery(data?.gallery);
    this.colorsList = data?.colors_list || [];
  }

  toObject(): Record<string, any> {
    return {
      content: this.content,
      check_list: this.checkList,
      gallery: this.gallery.toObject(),
      colors_list: this.colorsList
    };
  }
}

export default ProjectDesign;
