class ProjectStatus {
  createdAt: string;
  updatedAt: string;
  progress: string;

  constructor(data: Record<string, any> = {}) {
    this.createdAt = data?.created_at || '';
    this.updatedAt = data?.updated_at || '';
    this.progress = data?.progress || '25';
  }
}

export default ProjectStatus;
