import Image from './Image';
import Model from './Model';
import Task from './Task';

class ProjectDelivery extends Model {
  checkList: Array<Task>;
  gallery: Array<Image>;
  contentURL: string | null;

  constructor(data: Record<string, any> = {}) {
    super();

    this.checkList = data?.check_list ? this.toArrayTask(data?.check_list) : [];
    this.gallery = data?.gallery ? this.toArrayImage(data.gallery) : [];
    this.contentURL = data?.content || null;
  }

  toArrayTask(data: Array<Record<string, any>>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }

  toArrayImage(data: Array<Record<string, any>>) {
    const images: Array<Image> = [];

    data.forEach((image) => {
      images.push(new Image(image));
    });

    return images;
  }
}

export default ProjectDelivery;
