import Model from './Model';
import ProjectURL, { ProjectURLObject } from './ProjectURL';

export type ProjectURLsObject = {
  homepage: ProjectURLObject;
  ios: ProjectURLObject;
  android: ProjectURLObject;
};

class ProjectURLs extends Model {
  homepage: ProjectURL;
  ios: ProjectURL;
  android: ProjectURL;

  constructor(data: Record<string, any> | ProjectURLsObject = {}) {
    super();

    this.homepage = data?.homepage
      ? new ProjectURL(data.homepage)
      : new ProjectURL({
          name: 'Homepage',
          description: 'Website of the project',
        });
    this.ios = data?.ios
      ? new ProjectURL(data.ios)
      : new ProjectURL({
          name: 'Apple App Store Link',
          description: 'Link to iOS Application',
        });
    this.android = data?.android
      ? new ProjectURL(data.android)
      : new ProjectURL({
          name: 'Google Play Link',
          description: 'Link to Android Application',
        });
  }

  toProjectURLsObject(): ProjectURLsObject {
    return {
      homepage: this.homepage.toProjectURLObject(),
      ios: this.ios.toProjectURLObject(),
      android: this.android.toProjectURLObject(),
    };
  }
}

export default ProjectURLs;
