import Model from './Model';
import RepoContent, { RepoContentObject } from './RepoContent';

export interface RepoContentsObject {
  solution: RepoContentObject | null;
  design: RepoContentObject | null;
  development: RepoContentObject | null;
  delivery: RepoContentObject | null;
  problem: RepoContentObject | null;
  details: RepoContentObject | null;
}

class RepoContents extends Model {
  solution: RepoContent | null;
  design: RepoContent | null;
  development: RepoContent | null;
  delivery: RepoContent | null;
  problem: RepoContent | null;
  details: RepoContent | null;

  constructor(data: Record<string, any> | RepoContentsObject = {}) {
    super();

    this.solution = data?.solution ? new RepoContent(data.solution) : null;
    this.design = data?.design ? new RepoContent(data.design) : null;
    this.development = data?.development
      ? new RepoContent(data.development)
      : null;
    this.delivery = data?.delivery ? new RepoContent(data.delivery) : null;
    this.problem = data?.problem ? new RepoContent(data.problem) : null;
    this.details = data?.details ? new RepoContent(data.details) : null;
  }

  setSolution(solution: RepoContent) {
    this.solution = solution;
  }

  setDesign(design: RepoContent) {
    this.design = design;
  }

  setDevelopment(development: RepoContent) {
    this.development = development;
  }

  setDelivery(delivery: RepoContent) {
    this.delivery = delivery;
  }

  setProblem(problem: RepoContent) {
    this.problem = problem;
  }

  setDetails(details: RepoContent) {
    this.details = details;
  }
}

export default RepoContents;
