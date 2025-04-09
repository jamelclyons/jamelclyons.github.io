class Version {
  major: number;
  minor: number;
  patch: number;

  constructor(projectVersion: string) {
    const version = this.parse(projectVersion);

    this.major = version[0];
    this.minor = version[1];
    this.patch = version[2];
  }

  parse(tag: string) {
    return tag.split('.').map((s) => parseInt(s));
  }

  isEqual(tag: string) {}

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}

export default Version;
