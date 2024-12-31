import Model from './Model';
import Image from "./Image";

class ProjectProblem extends Model {
  content: Array<string>;
  gallery: Array<Image>;

  constructor(data: Record<string, any> = {}) {
    super();
    
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
