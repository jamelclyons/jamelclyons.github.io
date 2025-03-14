import Model from './Model';

import { formatTime } from '@/utilities/String';

export type ProjectStatusObject = {
  created_at: string | null;
  updated_at: string | null;
  progress: string | null;
};

export type ProjectStatusDataObject = {
  created_at: string | null;
  updated_at: string | null;
  progress: string | null;
};

class ProjectStatus extends Model {
  createdAt: string | null;
  updatedAt: string | null;
  progress: string | null;

  constructor(data: Record<string, any> | ProjectStatusObject = {}) {
    super();

    this.createdAt = data?.created_at ? formatTime(data.created_at) : null;
    this.updatedAt = data?.updated_at ? formatTime(data.updated_at) : null;
    this.progress = data?.progress || null;
  }

  toProjectStatusObject(): ProjectStatusObject {
    return {
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      progress: this.progress,
    };
  }

  toProjectStatusDataObject(): ProjectStatusDataObject {
    return {
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      progress: this.progress,
    };
  }
}

export default ProjectStatus;
