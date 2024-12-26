class ProjectDevelopment {
  content: Array<string> = [];
  checkList: Array<string> = [];
  owner: string;
  repoURL: string = '';
  versionsList: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
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
