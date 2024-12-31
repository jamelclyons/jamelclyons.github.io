import Model from './Model';
import Image from './Image';

class Contact extends Model {
  id: string;
  title: string;
  url: string;
  image: Image;
  value: string;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id || '';
    this.title = data?.title || '';
    this.url = data?.url || '';
    this.image = data?.image
      ? new Image(data?.image)
      : new Image({
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9oOKlwAAAABJRU5ErkJggg==',
        });
    this.value = data?.value || '';
  }
}

export default Contact;
