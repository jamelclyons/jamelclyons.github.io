import Model from './Model';
import Task from './Task';
import ProjectVersions from './ProjectVersions';

class ProjectDevelopment extends Model {
  content: Array<string>;
  checkList: Array<Task>;
  owner: string;
  repoURL: string;
  versionsList: ProjectVersions;
  types: Set<string>;
  languages: Set<string>;
  frameworks: Set<string>;
  technologies: Set<string>;

  constructor(data: Record<string, any> = {}) {
    super();
    
    this.content = data?.content || [];
    this.checkList = data?.check_list || [];
    this.owner = data?.owner || '';
    this.repoURL = data?.repo_url || '';
    this.versionsList = data?.versions_list || [];
    this.types = data?.types;
    this.languages = data?.languages;
    this.frameworks = data?.frameworks;
    this.technologies = data?.technologies;
  }
}

export default ProjectDevelopment;
