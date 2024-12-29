class Repo {
  id: string;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  description: string;
  repoURL: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data?.name || '';
    this.createdAt = data?.created_at || '';
    this.updatedAt = data?.updated_at || '';
    this.homepage = data?.homepage || '';
    this.description = data?.description || '';
    this.repoURL = data?.html_url || '';
  }
}

export default Repo;
