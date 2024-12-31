import Model from './Model';
import ProjectDetails from './ProjectDetails';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectProblem from './ProjectProblem';
import ProjectProcess from './ProjectProcess';
import ProjectSolution from './ProjectSolution';
import ProjectStatus from './ProjectStatus';
import Repo from './Repo';

class Project extends Model {
  id: string;
  title: string;
  description: string;
  solution: ProjectSolution;
  process: ProjectProcess;
  problem: ProjectProblem;
  details: ProjectDetails;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id || '';
    this.title = data?.title ?? this.getTitle(data?.id);
    this.description = data?.description ?? 'No Description Provided.';
    this.solution = data?.solution;
    this.process = data?.process;
    this.problem = data?.problem;
    this.details = data?.details;
  }
  
  getTitle(id: string): string {
    let title = id;

    if (id.includes('-')) {
      title = id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }

    return title;
  }

  fromRepo(repo: Repo) {
    this.id = repo.id;
    this.title = this.title ? this.title : this.getTitle(this.id);
    this.description = repo?.description || 'No Description Provided.';

    let data = repo.toObject();

    this.solution = new ProjectSolution(data);
    this.process = new ProjectProcess();
    this.process.status = new ProjectStatus(data);
    this.process.development = new ProjectDevelopment(data);
  }
}

export default Project;
