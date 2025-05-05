import Model from './Model';

export type GitHubRepoQueryObject = {
  owner: string;
  repo: string;
};

class GitHubRepoQuery extends Model {
  owner: string;
  repo: string;
  accountType: string;

  constructor(owner: string, repo: string, accountType: string = 'user') {
    super();

    this.owner = owner;
    this.repo = repo;
    this.accountType = accountType;
  }

  toGitHubRepoQueryObject(): GitHubRepoQueryObject {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }
}

export default GitHubRepoQuery;
