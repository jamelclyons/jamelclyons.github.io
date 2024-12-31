import Model from './Model';

class ProjectStatus extends Model {
  createdAt: string;
  updatedAt: string;
  progress: string;

  constructor(data: Record<string, any> = {}) {
    super();
    
    this.createdAt = data?.created_at || '';
    this.updatedAt = data?.updated_at || '';
    this.progress = data?.progress || '25';
  }
}

export default ProjectStatus;
