import Model from './Model';
import Task from './Task';
import ProjectVersions from './ProjectVersions';
import Taxonomy from './Taxonomy';

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
    this.types = data.types ? new Set(data.types) : new Set;
    this.languages = data.languages ? new Set(data.languages) : new Set;
    this.frameworks = data.frameworks ? new Set(data.frameworks) : new Set;
    this.technologies = data.technologies ? new Set(data.technologies) : new Set;
  }
}

export default ProjectDevelopment;
