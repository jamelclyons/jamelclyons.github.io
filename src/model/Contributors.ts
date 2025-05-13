import Contributor, { ContributorObject } from './Contributor';
import Model from './Model';
import User, { UserObject } from './User';

import { RepoContributorsResponse } from '@/controllers/githubSlice';

export interface ContributorsObject {
  users: Array<UserObject>;
}

export type RepoContributors = Array<ContributorObject>;

class Contributors extends Model {
  users: Array<User>;

  constructor(contributors?: ContributorsObject) {
    super();

    this.users =
      contributors && contributors.users
        ? contributors.users.map((user) => new User(user))
        : [];
  }

  set(users: Array<User>) {
    this.users = users;
  }

  fromGitHub(contributors: RepoContributors) {
    let users: Array<User> = [];

    if (Array.isArray(contributors) && contributors.length > 0) {
      contributors.forEach((contributor) => {
        const user = new Contributor();
        console.log(contributor);
        // user.fromGitHub(contributor);
        // users.push(user);
      });
    }
    this.users = users;
  }

  toContributorsObject(): ContributorsObject {
    return {
      users: this.users.map((user) => user.toUserObject()),
    };
  }
}

export default Contributors;
