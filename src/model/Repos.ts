import Model from './Model';
import Repo from './Repo';

class Repos extends Model {
  collection: Array<Repo>;
  count: number = 0;

  constructor(data: Array<Record<string, any>>) {
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
}

export default Repos;
