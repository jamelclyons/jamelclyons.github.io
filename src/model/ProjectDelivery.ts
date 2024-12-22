class ProjectDelivery {
  content: Array<string> = [];
  checkList: Array<string> = [];
  gallery: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.content = data?.content || [];
    this.checkList = data?.check_list || [];
    this.gallery = data?.gallery || [];
  }

  toObject(): Record<string, any> {
    return {
      content: this.content,
      check_list: this.checkList,
      gallery: this.gallery
    };
  }
}

export default ProjectDelivery;
