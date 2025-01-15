import Model from './Model';
import Taxonomy from './Taxonomy';

class Skills extends Model {
  projectTypes: Set<Taxonomy>;
  languages: Set<Taxonomy>;
  frameworks: Set<Taxonomy>;
  technologies: Set<Taxonomy>;

  constructor(data: Record<string, any> = []) {
    super();

    this.projectTypes = Array.isArray(data?.projectTypes) ? this.getProjectTypes(data?.projectTypes) : new Set();
    this.languages = Array.isArray(data?.languages) ? this.getLanguages(data?.languages) : new Set();
    this.frameworks = Array.isArray(data?.frameworks) ? this.getFrameworks(data?.frameworks) : new Set();
    this.technologies = Array.isArray(data?.technologies) ? this.getTechnologies(data?.technologies) : new Set();
  }

  getProjectTypes(data: Array<Record<string, any>> = []) {
    let projectTypes: Set<Taxonomy> = new Set();

    data.forEach((projectType) => {
      projectTypes.add(new Taxonomy(projectType));
    });

    return projectTypes;
  }

  getLanguages(data: Array<Record<string, any>> = []) {
    let languages: Set<Taxonomy> = new Set();

    data.forEach((language) => {
      languages.add(new Taxonomy(language));
    });

    return languages;
  }

  getFrameworks(data: Array<Record<string, any>> = []) {
    let frameworks: Set<Taxonomy> = new Set();

    data.forEach((framework) => {
      frameworks.add(new Taxonomy(framework));
    });

    return frameworks;
  }

  getTechnologies(data: Array<Record<string, any>> = []) {
    let technologies: Set<Taxonomy> = new Set();

    data.forEach((technology) => {
      technologies.add(new Taxonomy(technology));
    });

    return technologies;
  }
}

export default Skills;
