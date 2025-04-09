import Model from './Model';
import Version from './Version';

export type FeatureObject = {
  id: string;
  description: string;
  version: string | null;
};

class Feature extends Model {
  id: string;
  description: string;
  version: Version;

  constructor(data?: Record<string, any> | FeatureObject) {
    super();

    this.id = data?.id ?? '';
    this.description = data?.description ?? '';
    this.version = data?.version
      ? new Version(data.version)
      : new Version('1.0.0');
  }

  order(version: Version) {
    const major =
      (this.version ? this.version.major : 1) - (version ? version.major : 1);
    const minor =
      (this.version ? this.version.minor : 0) - (version ? version.minor : 0);
    const patch =
      (this.version ? this.version.patch : 0) - (version ? version.patch : 0);

    return major + minor + patch;
  }

  toFeatureObject(): FeatureObject {
    return {
      id: this.id,
      description: this.description,
      version: this.version ? this.version.toString() : null,
    };
  }
}

export default Feature;
