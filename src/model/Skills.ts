import Model from './Model';
import Taxonomy from './Taxonomy';

class Skills extends Model {
  projectTypes: Set<Taxonomy>;
  languages: Set<Taxonomy>;
  frameworks: Set<Taxonomy>;
  technologies: Set<Taxonomy>;

  constructor(
    projectTypes: Array<Record<string, any>> = [],
    languages: Array<Record<string, any>> = [],
    frameworks: Array<Record<string, any>> = [],
    technologies: Array<Record<string, any>> = []
  ) {
    super();

    this.projectTypes = this.getProjectTypes(projectTypes);
    this.languages = this.getLanguages(languages);
    this.frameworks = this.getFrameworks(frameworks);
    this.technologies = this.getTechnologies(technologies);
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
