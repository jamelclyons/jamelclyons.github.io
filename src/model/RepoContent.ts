import Model from './Model';

export interface RepoContentObject extends Model {
  id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  download_url: string;
}

class RepoContent extends Model {
  id: string = '';
  name: string = '';
  path: string = '';
  type: string = '';
  size: number = 0;
  downloadURL: string = '';

  constructor(data: Record<string, any> | RepoContentObject = {}) {
    super();
    // Get SHA from github as id
    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.path = data?.path ?? '';
    this.type = data?.type ?? '';
    this.size = data?.size ?? '';
    this.downloadURL = data?.download_url ?? '';
  }
}

export default RepoContent;
