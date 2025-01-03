import Model from './Model';
import ProjectURL from './ProjectURL';

class ProjectURLs extends Model {
  homepage: ProjectURL;
  ios: ProjectURL;
  android: ProjectURL;

  constructor(data: Record<string, any> = {}) {
    super();

    this.homepage = data?.homepage ? new ProjectURL(data?.homepage) : new ProjectURL();
    this.ios = new ProjectURL(data?.ios);
    this.android = new ProjectURL(data?.android);
  }
}

export default ProjectURLs;
