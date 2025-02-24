import Model from './Model';

import { formatTime } from '@/utilities/String';

export type ProjectStatusObject = {
  created_at: string;
  updated_at: string;
  progress: string;
};

class ProjectStatus extends Model {
  createdAt: string;
  updatedAt: string;
  progress: string;

  constructor(data: Record<string, any> = {}) {
    super();

    this.createdAt = data?.created_at ? formatTime(data.created_at) : '';
    this.updatedAt = data?.updated_at ? formatTime(data.updated_at) : '';
    this.progress = data?.progress || '0';
  }
}

export default ProjectStatus;
