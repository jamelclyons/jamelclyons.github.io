import Model from './Model';
import Organization from './Organization';

class Organizations extends Model {
  list: Array<Organization>;
  count: number;

  constructor(data?: Array<Record<string, any>>) {
    super();

    let organizations: Array<Organization> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.map((organization) => {
        organizations.push(new Organization(organization));
      });
    }
    this.list = organizations;
    this.count = organizations.length;
  }
}

export default Organizations;
