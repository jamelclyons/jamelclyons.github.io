import Image from './Image';
import Model from './Model';
import Task from './Task';

class ProjectDelivery extends Model {
  content: string | object;
  checkList: Array<Task> = [];
  gallery: Array<Image> = [];

  constructor(data: Record<string, any> = {}) {
    super();
    
    this.content = data?.content || '';
    this.checkList = data?.check_list || [];
    this.gallery = data?.gallery || [];
  }
}

export default ProjectDelivery;
