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
}

export default Contributors;
