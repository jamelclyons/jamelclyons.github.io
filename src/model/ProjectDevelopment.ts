import Model from './Model';
import Task from './Task';
import ProjectVersions from './ProjectVersions';
import Skills from './Skills';

class ProjectDevelopment extends Model {
  content: string | object;
  checkList: Array<Task>;
  repoURL: string;
  versionsList: ProjectVersions;
  skills: Skills;

  constructor(data: Record<string, any> = {}) {
    super();
    
    this.repoURL = data?.repo_url || '';
    this.checkList = data?.check_list ? this.toArrayTask(data.check_list) : [];
    this.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : new ProjectVersions();
    this.skills = data?.skills ? new Skills(data.skills) : new Skills;
    this.content = data?.content || '';
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
