import Model from './Model';
import Repo, { RepositoryGQL } from './Repo';

class Repos extends Model {
  collection: Array<Repo>;
  count: number = 0;

  constructor(data?: Array<Record<string, any>>) {
    super();

    let repos: Array<Repo> = [];

    if (Array.isArray(data)) {
      data.forEach((repo) => {
        repos.push(new Repo(repo));
      });
    }

    this.collection = repos;
    this.count = repos.length;
  }

  setCollection(collection: Array<Repo>) {
    this.collection = collection;
  }

  fromGitHubGraphQL(repos: Array<RepositoryGQL>) {
    let repositories: Array<Repo> = [];

    if (Array.isArray(repos)) {
      repos.forEach((repo) => {
        const repository = new Repo();
        repository.fromGitHubGraphQL(repo);
        repositories.push(repository);
      });
    }

    this.collection = repositories;
  }

  fromGitHub(data?: Array<Record<string, any>>) {
    let repos: Array<Repo> = [];

    if (Array.isArray(data)) {
      data.forEach((repoObject) => {
        const repo = new Repo();
        repo.fromGitHub(repoObject);
        repos.push(repo);
      });
    }

    this.collection = repos;
    this.count = repos.length;
  }
}

export default Repos;
