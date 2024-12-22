class ProjectProblem {
  problem: Array<string> = [];
  problemGallery: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.problem = data?.problem || [];
    this.problemGallery = data?.problem_gallery || [];
  }

  toObject(): Record<string, any> {
    return {
      problem: this.problem,
      problem_gallery: this.problemGallery,
    };
  }
}

export default ProjectProblem;
