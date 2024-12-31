import Model from './Model';

class ProjectDelivery extends Model {
  content: Array<string> = [];
  checkList: Array<string> = [];
  gallery: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    super();
    
    this.content = data?.content || [];
    this.checkList = data?.check_list || [];
    this.gallery = data?.gallery || [];
  }
}

export default ProjectDelivery;
