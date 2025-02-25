import Model from './Model';
import Feature, { FeatureObject } from './Feature';
import ProjectURLs, { ProjectURLsObject } from './ProjectURLs';
import Gallery, { GalleryObject } from './Gallery';

export type ProjectSolutionObject = {
  gallery: GalleryObject;
  features: Array<FeatureObject>;
  content_url: string;
  currency: string;
  price: number;
  project_urls: ProjectURLsObject;
};

class ProjectSolution extends Model {
  gallery: Gallery;
  features: Set<Feature>;
  contentURL: string | null;
  currency: string;
  price: number;
  projectURLs: ProjectURLs;

  constructor(data: Record<string, any> | ProjectSolutionObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.features = data?.features
      ? this.setFeatures(data.features)
      : new Set<Feature>();
    this.contentURL = data?.content_url || null;
    this.currency = data?.currency || 'USD';
    this.price = data?.price || 0;
    this.projectURLs = data?.project_urls
      ? new ProjectURLs(data.project_urls)
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
