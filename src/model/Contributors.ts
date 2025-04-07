import Model from './Model';
import User, { UserObject } from './User';

export interface ContributorsObject {
  users: Array<UserObject>;
}

class Contributors extends Model {
  users: Array<User>;

  constructor(users?: Array<User>) {
    super();

    this.users = users || [];
  }

  set(users: Array<User>) {
    this.users = users;
  }

  toContributorsObject(): ContributorsObject {
    return {
      users: this.users.map((user) => user.toUserObject()),
    };
  }
}

export default Contributors;
