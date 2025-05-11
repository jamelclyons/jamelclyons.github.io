import { RepoContributorsResponse } from '@/controllers/githubSlice';
import Model from './Model';
import User, { UserObject } from './User';

export interface ContributorsObject {
  users: Array<UserObject>;
}

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

  fromGitHub(response: RepoContributorsResponse) {
    let users: Array<User> = [];

    if (Array.isArray(response.data) && response.data.length > 0) {
      response.data.forEach((contributor) => {
        const user = new User();
        user.fromGitHub(contributor);
        users.push(user);
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
