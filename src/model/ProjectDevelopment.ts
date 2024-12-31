import Model from './Model';

import Task from './Task';
import ProjectVersions from './ProjectVersions';

class ProjectDevelopment extends Model {
  content: Array<string>;
  checkList: Array<Task>;
  owner: string;
  repoURL: string;
  versionsList: ProjectVersions;

  constructor(data: Record<string, any> = {}) {
    super();
    
    this.content = data?.content || [];
    this.checkList = data?.check_list || [];
    this.owner = data?.owner || '';
    this.repoURL = data?.repo_url || '';
    this.versionsList = data?.versions_list || [];
  }

  toObject(): Record<string, any> {
    return {
      content: this.content,
      check_list: this.checkList,
      repo_url: this.repoURL,
      versions_list: this.versionsList,
    };
  }
}

export default ProjectDevelopment;
