import Model from './Model';
import Feature, { FeatureObject } from './Feature';
import ProjectURLs, {
  ProjectURLsDataObject,
  ProjectURLsObject,
} from './ProjectURLs';
import Gallery, { GalleryObject } from './Gallery';
import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectSolutionObject = {
  gallery: GalleryObject;
  features: Array<FeatureObject>;
  content_url: ContentURLObject | null;
  project_urls: ProjectURLsObject;
};

export type ProjectSolutionDataObject = {
  gallery: GalleryObject;
  features: Array<FeatureObject>;
  content_url: string | null;
  project_urls: ProjectURLsDataObject;
};

class ProjectSolution extends Model {
  gallery: Gallery;
  features: Set<Feature>;
  contentURL: ContentURL | null;
  projectURLs: ProjectURLs;

  constructor(data: Record<string, any> | ProjectSolutionObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.features = data?.features
      ? this.setFeatures(data.features)
      : new Set<Feature>();
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url.url)
      : null;
    this.projectURLs = data?.project_urls
      ? new ProjectURLs(data.project_urls)
      : new ProjectURLs();
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
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

  toProjectSolutionObject(): ProjectSolutionObject {
    return {
      gallery: this.gallery.toGalleryObject(),
      features: Array.from(this.features).map((feature) =>
        feature.toFeatureObject()
      ),
      content_url: this.contentURL
        ? this.contentURL?.toContentURLObject()
        : null,
      project_urls: this.projectURLs.toProjectURLsObject(),
    };
  }

  toProjectSolutionDataObject(): ProjectSolutionDataObject {
    return {
      gallery: this.gallery.toGalleryObject(),
      features: Array.from(this.features).map((feature) =>
        feature.toFeatureObject()
      ),
      content_url: this.contentURL?.url ? this.contentURL.url : null,
      project_urls: this.projectURLs.toProjectURLsDataObject(),
    };
  }
}

export default ProjectSolution;
