import Model from './Model';

export type ProjectVersionsObject = {
  current: string;
  history: Array<string>;
};

class ProjectVersions extends Model {
  current: string;
  history: Set<string>;

  constructor(data: Record<string, any> | ProjectVersionsObject = {}) {
    super();

    this.current = data?.current ?? '1.0.0';
    this.history = data?.history ?? [];
  }
  
  toProjectVersionsObject(): ProjectVersionsObject {
    return {
      current: this.current,
      history: Array.from(this.history),
    };
  }
}

export default ProjectVersions;

// export const existsInSet = (taxonomy: Taxonomy, set: Set<Taxonomy>) => {
//   const map = new Map(Array.from(set).map((tax) => [tax.id, tax]));

//   return map.has(taxonomy.id);
// };