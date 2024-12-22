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
  types: Array<string> = [];
  languages: Array<string> = [];
  frameworks: Array<string> = [];
  technologies: Array<string> = [];
  details: ProjectDetails;

  constructor(data: Record<string, any> = {}) {
    this.id = data?.id || '';
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.urlsList = data?.urls_list || [];
    this.solution = new ProjectSolution(data?.solution);
    this.process = new ProjectProcess(data?.process);
    this.problem = new ProjectProblem(data?.problem);
    this.types = data?.types || '';
    this.languages = data?.languages || [];
    this.frameworks = data?.frameworks || [];
    this.technologies = data?.technologies || [];
    this.details = new ProjectDetails(data?.details);
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
