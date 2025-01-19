import Model from './Model';

class RepoContentQuery extends Model {
  owner: string;
  repo: string;
  path: string;

  constructor(owner: string, repo: string, path: string) {
    super();

    this.owner = owner;
    this.repo = repo;
    this.path = path;
  }
}

export default RepoContentQuery;
