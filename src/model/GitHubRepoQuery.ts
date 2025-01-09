class GitHubRepoQuery {
  owner: string;
  repo: string;

  constructor(owner: string, repo: string) {
    this.owner = owner;
    this.repo = repo;
  }
}
export default GitHubRepoQuery;
