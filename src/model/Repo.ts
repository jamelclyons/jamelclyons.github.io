import Model from './Model';
import Owner from './Owner';

class Repo extends Model {
  id: string;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  description: string;
  repoURL: string;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.name ?? data?.id ?? '';
    this.owner = new Owner(data?.owner);
    this.createdAt = data?.created_at ?? '';
    this.updatedAt = data?.updated_at ?? '';
    this.homepage = data?.homepage ?? '';
    this.description = data?.description ?? '';
    this.repoURL = data?.repo_url ?? data?.html_url ?? '';
  }

  getOwner(data: Record<string, any>) {
    if (typeof data === 'object') {
      return data.login;
    }

    if (typeof data === 'string') {
      return data;
    }

    return '';
  }
}

export default Repo;
