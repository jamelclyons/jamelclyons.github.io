import Model from './Model';

class RepoContentQuery extends Model {
  owner: string;
  repo: string;
  path: string;
  branch: string;

  constructor(owner: string, repo: string, path: string, branch: string) {
    super();

    this.owner = owner;
    this.repo = repo;
    this.path = path;
    this.branch = branch;
  }
}

export default RepoContentQuery;
