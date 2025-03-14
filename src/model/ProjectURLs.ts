import Model from './Model';
import ProjectURL, { ProjectURLObject } from './ProjectURL';
import Image from './Image';

export type ProjectURLsObject = {
  homepage: ProjectURLObject | null;
  ios: ProjectURLObject | null;
  android: ProjectURLObject | null;
};

export type ProjectURLsDataObject = {
  homepage: string | null;
  ios: string | null;
  android: string | null;
};

class ProjectURLs extends Model {
  homepage: ProjectURL;
  ios: ProjectURL;
  android: ProjectURL;

  constructor(data: Record<string, any> | ProjectURLsObject = {}) {
    super();

    this.homepage = new ProjectURL({
      name: 'Homepage',
      description: 'Website of the project',
      url: data?.homepage?.url ? data.homepage.url : null,
      image: new Image({ class_name: 'fa-solid fa-house' }).toImageObject(),
    });
    this.ios = new ProjectURL({
      name: 'Apple App Store',
      description: 'Link to iOS application',
      url: data?.ios?.url ? data.ios.url : null,
      image: new Image({
        class_name: 'fa-brands fa-app-store-ios',
      }).toImageObject(),
    });
    this.android = new ProjectURL({
      name: 'Google Play Store',
      description: 'Link to Android application',
      url: data?.android?.url ? data.android.url : null,
      image: new Image({
        class_name: 'fa-brands fa-google-play',
      }).toImageObject(),
    });
  }

  toProjectURLsObject(): ProjectURLsObject {
    return {
      homepage: this.homepage ? this.homepage.toProjectURLObject() : null,
      ios: this.ios ? this.ios.toProjectURLObject() : null,
      android: this.android ? this.android.toProjectURLObject() : null,
    };
  }

  toProjectURLsDataObject(): ProjectURLsDataObject {
    return {
      homepage: this.homepage?.url ? this.homepage.url : null,
      ios: this.ios?.url ? this.ios.url : null,
      android: this.android?.url ? this.android.url : null,
    };
  }
}

export default ProjectURLs;
