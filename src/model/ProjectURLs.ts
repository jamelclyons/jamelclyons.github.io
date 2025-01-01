import Model from './Model';
import ProjectURL from './ProjectURL';

class ProjectURLs extends Model {
  homepage: ProjectURL;
  ios: ProjectURL;
  android: ProjectURL;

  constructor(data: Record<string, any> = {}) {
    super();

    this.homepage = new ProjectURL(data?.homepage) ?? null;
    this.ios = new ProjectURL(data?.ios) ?? null;
    this.android = new ProjectURL(data?.android) ?? null;
  }
}

export default ProjectURLs;
