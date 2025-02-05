import Model from './Model';
import User from './User';

class Contributors extends Model {
  users: Array<User>;

  constructor(users?: Array<User>) {
    super();

    this.users = users || [];
  }
}

export default Contributors;
