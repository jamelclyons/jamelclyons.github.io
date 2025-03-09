import ContentURL from './ContentURL';
import Model from './Model';

export interface RepoContentObject extends Model {
  id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  download_url: string | null;
}

class RepoContent extends Model {
  id: string = '';
  name: string = '';
  path: string = '';
  type: string = '';
  size: number = 0;
  downloadURL: string | null = null;

  constructor(data: Record<string, any> | RepoContentObject = {}) {
    super();
    // Get SHA from github as id
    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.path = data?.path ?? '';
    this.type = data?.type ?? '';
    this.size = data?.size ?? 0;
    this.downloadURL = data?.download_url ? new ContentURL(data.download_url).url : null;
  }
}

export default RepoContent;
