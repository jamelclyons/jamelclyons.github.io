import Model from './Model';
import ProjectURL from './ProjectURL';

class ProjectURLs extends Model {
  homepage: ProjectURL;
  ios: ProjectURL;
  android: ProjectURL;

  constructor(data: Record<string, any> = {}) {
    super();

    this.homepage = data?.homepage ?? null;
    this.ios = data?.ios ?? null;
    this.android = data?.android ?? null;
  }
}

export default ProjectURLs;
