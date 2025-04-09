import ProjectVersions from './ProjectVersions';

class Roadmap {
  path: Array<string>;

  constructor(versions: ProjectVersions) {
    this.path = versions.order();
  }
}

export default Roadmap;
