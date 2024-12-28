import ProjectDetails from './ProjectDetails';
import ProjectProblem from './ProjectProblem';
import ProjectProcess from './ProjectProcess';
import ProjectSolution from './ProjectSolution';

class Project {
  id: string = '';
  title: string = '';
  description: string = '';
  urlsList: Array<string> = [];
  solution: ProjectSolution;
  process: ProjectProcess;
  problem: ProjectProblem;
  types: Set<string> = new Set();
  languages: Set<string> = new Set();
  frameworks: Set<string> = new Set();
  technologies: Set<string> = new Set();
  details: ProjectDetails;

  constructor(
    id: string,
    title: string,
    description: string,
    urlsList: Array<string>,
    solution: ProjectSolution,
    process: ProjectProcess,
    problem: ProjectProblem,
    types: Set<string>,
    languages: Set<string>,
    frameworks: Set<string>,
    technologies: Set<string>,
    details: ProjectDetails
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
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