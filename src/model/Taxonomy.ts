import { snakeCaseToPath } from '../utilities/String';
import Image from './Image';

class Taxonomy {
  id: string;
  type: string;
  title: string;
  path: string;
  image: Image;
  iconURL: string;
  className: string;

  constructor(
    id: string,
    type: string,
    title: string,
    iconURL: string,
    className: string
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.path = snakeCaseToPath(type);
    this.iconURL = iconURL;
    this.className = className;
    let img = new Image();
    img.id = this.id;
    img.title = this.title;
    img.url = this.iconURL;
    img.className = this.className;
    this.image = img;
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

  toObject() {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      path: this.path,
      icon_url: this.iconURL,
      class_name: this.className,
    };
  }
}

export default Taxonomy;
