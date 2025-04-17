import Model from './Model';

export type GitHubRepoQueryObject = {
  owner: string;
  repo: string;
};

class GitHubRepoQuery extends Model {
  owner: string;
  repo: string;

  constructor(owner: string, repo: string) {
    super();

    this.owner = owner;
    this.repo = repo;
  }

  toGitHubRepoQueryObject(): GitHubRepoQueryObject {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }
}

export default GitHubRepoQuery;
