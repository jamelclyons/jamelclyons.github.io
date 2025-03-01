import Model from './Model';

export type ProjectVersionsObject = {
  current: string;
  previous: Array<string>;
};

class ProjectVersions extends Model {
  current: string;
  previous: Array<string>;

  constructor(data: Record<string, any> | ProjectVersionsObject = {}) {
    super();

    this.current = data?.current;
    this.previous = data?.previous;
  }
}

export default ProjectVersions;
