import RepoContent from './RepoContent';
import Model from './Model';

class RepoContents extends Model {
  solution: RepoContent | null;
  design: RepoContent | null;
  development: RepoContent | null;
  delivery: RepoContent | null;
  problem: RepoContent | null;

  constructor(
    solution?: RepoContent,
    design?: RepoContent,
    development?: RepoContent,
    delivery?: RepoContent,
    problem?: RepoContent
  ) {
    super();

    this.solution = solution ?? null;
    this.design = design ?? null;
    this.development = development ?? null;
    this.delivery = delivery ?? null;
    this.problem = problem ?? null;
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
