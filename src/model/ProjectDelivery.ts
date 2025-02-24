import Gallery, { GalleryObject } from './Gallery';
import Image from './Image';
import Model from './Model';
import Task, { TaskObject } from './Task';

export type ProjectDeliveryObject = {
  check_list: Array<TaskObject>;
  gallery: GalleryObject;
  content_url: string;
};

class ProjectDelivery extends Model {
  checkList: Array<Task>;
  gallery: Gallery;
  contentURL: string | null;

  constructor(data: Record<string, any> | ProjectDeliveryObject = {}) {
    super();

    this.checkList = data?.check_list ? this.toArrayTask(data?.check_list) : [];
    this.gallery = new Gallery(data.gallery);
    this.contentURL = data?.content_url || null;
  }

  toArrayTask(data: Array<Record<string, any>>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }
}

export default ProjectDelivery;
