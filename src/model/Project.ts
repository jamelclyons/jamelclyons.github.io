import ProjectDetails from './ProjectDetails';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectProblem from './ProjectProblem';
import ProjectProcess from './ProjectProcess';
import ProjectSolution from './ProjectSolution';
import ProjectStatus from './ProjectStatus';
import ProjectUrl from './ProjectUrl';
import Repo from './Repo';

class Project {
  id: string;
  title: string;
  description: string;
  homepage: string;
  urlsList: Array<ProjectUrl>;
  solution: ProjectSolution;
  process: ProjectProcess;
  problem: ProjectProblem;
  types: Set<string>;
  languages: Set<string>;
  frameworks: Set<string>;
  technologies: Set<string>;
  details: ProjectDetails;

  constructor(
    id: string,
    title: string,
    description: string,
    homepage: string,
    urlsList: Array<ProjectUrl> = [],
    solution: ProjectSolution = new ProjectSolution(),
    process: ProjectProcess = new ProjectProcess(),
    problem: ProjectProblem = new ProjectProblem(),
    types: Set<string> = new Set(),
    languages: Set<string> = new Set(),
    frameworks: Set<string> = new Set(),
    technologies: Set<string> = new Set(),
    details: ProjectDetails = new ProjectDetails()
  ) {
    this.id = id || '';
    this.title = title ?? this.getTitle(id);
    this.description = description ?? 'No Description Provided.';
    this.homepage = homepage ?? '';
    this.urlsList = urlsList;
    this.solution = solution;
    this.process = process;
    this.problem = problem;
    this.types = types;
    this.languages = languages;
    this.frameworks = frameworks;
    this.technologies = technologies;
    this.details = details;
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
    this.homepage = repo?.homepage || '';

    let data = repo.toObject();

    this.process = new ProjectProcess();
    this.process.status = new ProjectStatus(data);
    this.process.development = new ProjectDevelopment(data);
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      urls_list: this.urlsList,
      solution: this.solution.toObject(),
      process: this.process.toObject(),
      problem: this.problem.toObject(),
      types: this.types,
      languages: this.languages,
      frameworks: this.frameworks,
      technologies: this.technologies,
      details: this.details.toObject(),
    };
  }
}

export default Project;
