import Image from './Image';

class Contact {
  id: string;
  title: string;
  url: string;
  image: Image;
  value: string;

  constructor(data: Record<string, any> = {}) {
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

  toObject(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      image: this.image,
      value: this.value,
    };
  }
}

export default Contact;
