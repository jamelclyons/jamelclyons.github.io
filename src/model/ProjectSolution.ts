class ProjectSolution {
  solution: Array<string> = [];
  gallery: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.solution = data?.solution || [];
    this.gallery = data?.gallery || [];
  }

  toObject(): Record<string, any> {
    return {
      solution: this.solution,
      gallery: this.gallery,
    };
  }
}

export default ProjectSolution;
