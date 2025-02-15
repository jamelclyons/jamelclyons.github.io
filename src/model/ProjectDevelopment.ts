import Model from './Model';
import Task from './Task';
import ProjectVersions from './ProjectVersions';
import Skills from './Skills';

class ProjectDevelopment extends Model {
  repoURL: string;
  contentURL: string | null;
  skills: Skills;
  checkList: Array<Task>;
  versionsList: ProjectVersions;

  constructor(data: Record<string, any> = {}) {
    super();

    this.repoURL = data?.repo_url || '';
    this.contentURL = data?.content_url || null;
    this.skills = data?.skills ? new Skills(data.skills) : new Skills;
    this.checkList = data?.check_list ? this.toArrayTask(data.check_list) : [];
    this.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : new ProjectVersions();
  }

  toArrayTask(data: Array<Record<string, any>>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }
}

export default ProjectDevelopment;
