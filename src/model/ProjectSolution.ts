import Model from './Model';
import Feature from './Feature';
import ProjectURLs from './ProjectURLs';
import Gallery from './Gallery';

class ProjectSolution extends Model {
  gallery: Gallery;
  features: Set<Feature>;
  contentURL: string | null;
  currency: string;
  price: number;
  urlsList: ProjectURLs;

  constructor(data: Record<string, any> = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.features = data?.features
      ? this.setFeatures(data.features)
      : new Set<Feature>();
    this.contentURL = data?.content_url || null;
    this.currency = data?.currency || 'USD';
    this.price = data?.price || 0;
    this.urlsList = data?.urlsList
      ? new ProjectURLs(data?.urlsList)
      : new ProjectURLs();
  }

  setFeatures(data?: Array<Record<string, any>>): Set<Feature> {
    let features = new Set<Feature>();

    if (data && data?.length > 0) {
      data.forEach((feature) => {
        features.add(new Feature(feature));
      });
    }

    return features;
  }
}

export default ProjectSolution;
