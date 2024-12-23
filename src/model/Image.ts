class Image {
  id: string;
  title: string;
  url: string;
  className: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data?.id || [];
    this.title = data?.title || [];
    this.url = data?.url || [];
    this.className = data?.class_name || [];
  }

  toObject(): Record<string, any> {
    return {
        id: this.id,
        title: this.title,
        url: this.url,
        class_name: this.className
    };
  }
}

export default Image;
