import Model from './Model';

export type FeatureObject = {
  id: string;
  description: string;
};

class Feature extends Model {
  id: string;
  description: string;

  constructor(data?: Record<string, any> | FeatureObject) {
    super();

    this.id = data?.id ?? '';
    this.description = data?.description ? data.description : 'Not Provided';
  }

  toFeatureObject(): FeatureObject {
    return {
      id: this.id,
      description: this.description,
    };
  }
}

export default Feature;
