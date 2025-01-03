import Model from './Model';

class Repo extends Model {
  id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  description: string;
  repoURL: string;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.name || '';
    this.owner = data?.owner?.login || '';
    this.createdAt = data?.created_at || '';
    this.updatedAt = data?.updated_at || '';
    this.homepage = data?.homepage || '';
    this.description = data?.description || '';
    this.repoURL = data?.html_url || '';
  }
}

export default Repo;
