import Model from './Model';

class GitHubRepoQuery extends Model {
  owner: string;
  repo: string;

  constructor(owner: string, repo: string) {
    super();

    this.owner = owner;
    this.repo = repo;
  }
}

export default GitHubRepoQuery;
