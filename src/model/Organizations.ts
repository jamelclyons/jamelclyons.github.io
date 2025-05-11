import Model from './Model';
import Organization, {
  OrganizationObject,
  OrganizationGQL,
} from './Organization';

class Organizations extends Model {
  list: Array<Organization>;
  count: number;

  constructor(data?: Array<OrganizationObject>) {
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

  fromGitHubGraphQL(orgs: Array<OrganizationGQL>) {
    let organizations: Array<Organization> = [];

    if (Array.isArray(orgs) && orgs.length > 0) {
      orgs.map((organization) => {
        const org = new Organization();
        org.fromGitHubGraphQL(organization);
        organizations.push(org);
      });
    }

    this.list = organizations;
  }
}

export default Organizations;
