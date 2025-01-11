import Model from './Model';
import { ProjectURL } from '@/model/ProjectURL';

export class ProjectURLs extends Model {
  homepage: ProjectURL;
  ios: ProjectURL;
  android: ProjectURL;

  constructor(data: Record<string, any> = {}) {
    super();

    this.homepage = data?.homepage
      ? new ProjectURL(data?.homepage)
      : new ProjectURL();
    this.ios = data?.ios ? new ProjectURL(data?.ios) : new ProjectURL();
    this.android = data?.android
      ? new ProjectURL(data?.android)
      : new ProjectURL();
  }
}
