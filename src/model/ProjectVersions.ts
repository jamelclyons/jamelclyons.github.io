class ProjectVersions {
  current: string;
  previous: Array<string>;

  constructor(current: string = '1.0.0', previous: Array<string> = []) {
    this.current = current;
    this.previous = previous;
  }

  toObject(): Record<string, any> {
    return {
      current: this.current,
      previous: this.previous,
    };
  }
}

export default ProjectVersions;
