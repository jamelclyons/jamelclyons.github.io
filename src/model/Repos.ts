import { AuthenticatedUserRepoResponse } from '@/controllers/githubSlice';
import Model from './Model';
import Repo, { RepoObject, RepositoryGQL } from './Repo';

class Repos extends Model {
  collection: Array<Repo>;
  count: number = 0;

  constructor(repos?: Array<RepoObject>) {
    super();

    this.collection =
      repos && Array.isArray(repos) ? repos.map((repo) => new Repo(repo)) : [];
    this.count = this.collection.length;
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
    this.count = this.collection.length;
  }

  fromGitHub(repos?: Array<RepoObject>) {
    this.collection = repos ? repos.map((repo) => new Repo(repo)) : [];
    this.count = this.collection.length;
  }

  fromGitHubAuthenticatedUser(repos: AuthenticatedUserRepoResponse) {
    console.log(repos);
  }
}
export default Repos;
