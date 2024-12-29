import Feature from './Feature';
import Image from './Image';

class ProjectSolution {
  gallery: Array<Image>;
  features: Set<Feature>;
  content: Array<string>;
  currency: string;
  price: number;

  constructor(data: Record<string, any> = {}) {
    this.gallery = data?.gallery || [];
    this.features = this.getFeatures(data?.features);
    this.content = data?.content || [];
    this.currency = data?.currency || '';
    this.price = data?.price || 0;
  }

  getFeatures(data?: Set<Feature>): Set<Feature> {
    let features = new Set<Feature>();
    
    if (data && data?.size > 0) {
      data.forEach((feature) => {
        features.add(feature);
      });
    }

    return features;
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
