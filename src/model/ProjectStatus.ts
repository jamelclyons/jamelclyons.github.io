import Model from './Model';

import { formatTime } from '@/utilities/String';
import ProjectProgress from './ProjectProgress';

export type ProjectStatusObject = {
  created_at: string | null;
  updated_at: string | null;
};

class ProjectStatus extends Model {
  createdAt: string | null;
  updatedAt: string | null;
  progress: ProjectProgress;

  constructor(data: ProjectStatusObject, progress?: ProjectProgress) {
    super();

    this.createdAt = data?.created_at ? formatTime(data.created_at) : null;
    this.updatedAt = data?.updated_at ? formatTime(data.updated_at) : null;
    this.progress = progress ? progress : new ProjectProgress();
  }

  toProjectStatusObject(): ProjectStatusObject {
    return {
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

export default ProjectStatus;
