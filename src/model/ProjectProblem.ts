import Image from "./Image";

class ProjectProblem {
  content: Array<string>;
  gallery: Array<Image>;

  constructor(data: Record<string, any> = {}) {
    this.content = data?.content || [];
    this.gallery = data?.gallery || [];
  }

  toObject(): Record<string, any> {
    return {
      content: this.content,
      gallery: this.gallery,
    };
  }
}

export default ProjectProblem;
