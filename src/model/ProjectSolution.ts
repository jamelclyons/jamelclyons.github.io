import Model from './Model';
import Feature from './Feature';
import Image from './Image';
import ProjectURLs from './ProjectURLs';
import Gallery from './Gallery';

class ProjectSolution extends Model {
  gallery: Gallery;
  features: Set<Feature>;
  content: Array<string>;
  currency: string;
  price: number;
  urlsList: ProjectURLs;

  constructor(data: Record<string, any> = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.features = data?.features
      ? this.getFeatures(data.features)
      : new Set();
    this.content = data?.content || [];
    this.currency = data?.currency || '';
    this.price = data?.price || 0;
    this.urlsList = data?.urlsList
      ? new ProjectURLs(data?.urlsList)
      : new ProjectURLs();
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
}

export default ProjectSolution;
