import Model from './Model';

class Image extends Model {
  id: string;
  title: string;
  url: string;
  className: string;

  constructor(data: Record<string, any> = {}) {
    super();
    
    this.id = data?.id || '';
    this.title = data?.title || '';
    this.url = data?.url || '';
    this.className = data?.class_name || '';
  }
}

export default Image;
