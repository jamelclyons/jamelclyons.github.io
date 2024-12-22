class ProjectSolution {
  solution: Array<string> = [];
  solutionGallery: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.solution = data?.solution || [];
    this.solutionGallery = data?.solution_gallery || [];
  }

  toObject(): Record<string, any> {
    return {
      solution: this.solution,
      solution_gallery: this.solutionGallery,
    };
  }
}

export default ProjectSolution;
