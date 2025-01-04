import Model from './Model';

import { snakeCaseToPath } from '../utilities/String';
import Image from './Image';

class Taxonomy extends Model {
  id: string;
  type: string;
  title: string;
  path: string;
  image: Record<string, any>;
  iconURL: string;
  className: string;
  usage: number;

  constructor(data?: Record<string, any>) {
    super();

    this.id = data?.id ? data.id : '';
    this.type = data?.type ? data.type : '';
    this.title = data?.title ? data.title : '';
    this.path = this.type ? snakeCaseToPath(this.type) : '';
    this.iconURL = data?.icon_url ? data.icon_url : '';
    this.className = data?.class_name ? data.class_name : '';
    this.usage = data?.usage ? data.usage : '';
    this.image = new Image({
      id: data?.id,
      title: data?.title,
      url: this.iconURL,
      class_name: this.className,
    }).toObject();
  }

  isValid(): boolean {
    if (this.id == '') {
      throw new Error('ID is not valid');
    }

    if (this.type == '') {
      throw new Error('Type is not valid');
    }

    if (this.title == '') {
      throw new Error('Title is not valid');
    }

    if (this.path == '') {
      throw new Error('Path is not valid');
    }

    return true;
  }
}

export default Taxonomy;
