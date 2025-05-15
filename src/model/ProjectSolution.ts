import Model from './Model';
import Feature, { FeatureObject } from './Feature';
import ProjectURLs, {
  ProjectURLsDataObject,
  ProjectURLsObject,
} from './ProjectURLs';
import Gallery, { GalleryObject } from './Gallery';
import ContentURL from './ContentURL';

export type ProjectSolutionObject = {
  gallery: GalleryObject | null;
  features: Array<FeatureObject> | null;
  content_url: string | null;
  project_urls: ProjectURLsObject | null;
};

export type ProjectSolutionDataObject = {
  gallery: GalleryObject | null;
  features: Array<FeatureObject> | null;
  content_url: string | null;
  project_urls: ProjectURLsDataObject | null;
};

class ProjectSolution extends Model {
  gallery: Gallery | null;
  features: Set<Feature> | null;
  contentURL: ContentURL | null;
  projectURLs: ProjectURLs | null;

  constructor(data: Record<string, any> | ProjectSolutionObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.features = data?.features ? this.setFeatures(data.features) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.projectURLs =
      data?.project_urls &&
      (data.project_urls.homepage || data.project_urls.ios || data.project_urls.android)
        ? new ProjectURLs(data.project_urls)
        : null;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setFeatures(data?: Array<FeatureObject>): Set<Feature> {
    let features = new Set<Feature>();

    if (data && data?.length > 0) {
      data.forEach((feature) => {
        features.add(new Feature(feature));
      });
    }

    return features;
  }

  toProjectSolutionObject(): ProjectSolutionObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      features: this.features
        ? Array.from(this.features).map((feature) => feature.toFeatureObject())
        : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      project_urls: this.projectURLs
        ? this.projectURLs.toProjectURLsObject()
        : null,
    };
  }

  toProjectSolutionDataObject(): ProjectSolutionDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      features: this.features
        ? Array.from(this.features).map((feature) => feature.toFeatureObject())
        : null,
      content_url: this.contentURL?.url ? this.contentURL.url : null,
      project_urls: this.projectURLs
        ? this.projectURLs.toProjectURLsDataObject()
        : null,
    };
  }
}

export default ProjectSolution;
