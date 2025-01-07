import Model from './Model';
import Task from './Task';
import ProjectVersions from './ProjectVersions';

class ProjectDevelopment extends Model {
  content: string | object;
  checkList: Array<Task>;
  repoURL: string;
  versionsList: ProjectVersions;
  types: Set<string>;
  languages: Set<string>;
  frameworks: Set<string>;
  technologies: Set<string>;

  constructor(data: Record<string, any> = {}) {
    super();

    this.repoURL = data?.repo_url || '';
    this.checkList = data?.check_list ? this.toArrayTask(data.check_list) : [];
    this.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : new ProjectVersions();
    this.types = data?.types ? new Set(data.types) : new Set();
    this.languages = data?.languages ? new Set(data.languages) : new Set();
    this.frameworks = data?.frameworks ? new Set(data.frameworks) : new Set();
    this.technologies = data?.technologies
      ? new Set(data.technologies)
      : new Set();
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
