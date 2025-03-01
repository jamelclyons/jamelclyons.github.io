import Model from './Model';

export type ImageObject = {
  id: string;
  title: string;
  url: string;
  class_name: string;
};

class Image extends Model {
  id: string;
  title: string;
  url: string;
  className: string;

  constructor(data: Record<string, any> | ImageObject = {}) {
    super();

    this.id = data?.id || '';
    this.title = data?.title || '';
    this.url = data?.url || '';
    this.className = data?.class_name || '';
  }

  toImageObject(): ImageObject {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      class_name: this.className,
    };
  }
}

export default Image;
