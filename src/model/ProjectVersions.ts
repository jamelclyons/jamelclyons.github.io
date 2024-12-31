import Model from './Model';

class ProjectVersions extends Model {
  current: string;
  previous: Array<string>;

  constructor(current: string = '1.0.0', previous: Array<string> = []) {
    super();
    
    this.current = current;
    this.previous = previous;
  }
}

export default ProjectVersions;
