import Model from './Model';

export type ProjectVersionsObject = {
  history: Array<string>;
  current: string;
  future: Array<string>;
};

class ProjectVersions extends Model {
  history: Set<string>;
  current: string;
  future: Set<string>;

  constructor(data: Record<string, any> | ProjectVersionsObject = {}) {
    super();

    this.history = data?.history ? new Set(data?.history) : new Set();
    this.current = data?.current ?? '1.0.0';
    this.future = data?.future ? new Set(data?.future) : new Set();
  }

  toProjectVersionsObject(): ProjectVersionsObject {
    return {
      history: Array.from(this.history),
      current: this.current,
      future: Array.from(this.future),
    };
  }
}

export default ProjectVersions;