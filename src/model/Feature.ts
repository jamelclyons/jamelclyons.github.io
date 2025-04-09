import Model from './Model';

export type FeatureObject = {
  id: string;
  description: string;
  version: string | null;
};

class Feature extends Model {
  id: string;
  description: string;
  version: string | null;

  constructor(data?: Record<string, any> | FeatureObject) {
    super();

    this.id = data?.id ?? '';
    this.description = data?.description ?? '';
    this.version = data?.version ? data.version : null;
  }

  toFeatureObject(): FeatureObject {
    return {
      id: this.id,
      description: this.description,
      version: this.version ? this.version : null,
    };
  }
}

export default Feature;
