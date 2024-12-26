class ProjectSolution {
  gallery: Array<string> = [];
  features: Array<string>;
  content: Array<string> = [];
  currency: string = '';
  price: number = 0;

  constructor(data: Record<string, any> = {}) {
    this.gallery = data?.gallery || [];
    this.features = data?.features || [];
    this.content = data?.content || [];
    this.currency = data?.currency || [];
    this.price = data?.price || [];
  }

  toObject(): Record<string, any> {
    return {
      gallery: this.gallery,
      features: this.features,
      content: this.content,
      currency: this.currency,
      price: this.price,
    };
  }
}

export default ProjectSolution;
