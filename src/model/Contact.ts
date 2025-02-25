import Model from './Model';
import Image, { ImageObject } from './Image';

export interface ContactObject {
  id: string;
  title: string;
  url: string;
  image: ImageObject;
  value: string;
}

class Contact extends Model {
  id: string;
  title: string;
  url: string;
  image: Image | null;
  value: string;

  constructor(
    id: string,
    title: string,
    url: string,
    image: Image,
    value: string
  ) {
    super();

    this.id = id;
    this.title = title;
    this.url = url;
    this.image = image;
    this.value = value;
  }
}

export default Contact;
