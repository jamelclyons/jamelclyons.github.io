import RepoContent, { RepoContentObject } from './RepoContent';
import Model from './Model';

export interface RepoContentsObject {
  solution: RepoContentObject;
  design: RepoContentObject;
  development: RepoContentObject;
  delivery: RepoContentObject;
  problem: RepoContentObject;
}
class RepoContents extends Model {
  solution: RepoContent;
  design: RepoContent;
  development: RepoContent;
  delivery: RepoContent;
  problem: RepoContent;

  constructor(data: Record<string, any> | RepoContentsObject = {}
  ) {
    super();

    this.solution = data?.solution ? new RepoContent(data.solution) : new RepoContent();
    this.design = data?.design ? new RepoContent(data.design) : new RepoContent();
    this.development = data?.development ? new RepoContent(data.development) : new RepoContent();
    this.delivery = data?.delivery ? new RepoContent(data.delivery) : new RepoContent();
    this.problem = data?.problem ? new RepoContent(data.problem) : new RepoContent();
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
}

export default RepoContents;
