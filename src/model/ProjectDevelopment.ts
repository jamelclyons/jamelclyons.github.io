class ProjectDevelopment {
  development: Array<string> = [];
  developmentCheckList: Array<string> = [];
  repoURL: string = '';
  versionsList: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.development = data?.development || [];
    this.developmentCheckList = data?.development_check_list || [];
    this.repoURL = data?.repo_url || '';
    this.versionsList = data?.versions_list || [];
  }

  toObject(): Record<string, any> {
    return {
      development: this.development,
      development_check_list: this.developmentCheckList,
      repo_url: this.repoURL,
      versions_list: this.versionsList,
    };
  }
}

export default ProjectDevelopment;
