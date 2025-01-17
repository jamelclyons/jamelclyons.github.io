import Model from './Model';
import Taxonomy from './Taxonomy';

class Skills extends Model {
  types: Set<Taxonomy>;
  languages: Set<Taxonomy>;
  frameworks: Set<Taxonomy>;
  technologies: Set<Taxonomy>;

  constructor(data: Record<string, any> = []) {
    super();

    this.types = Array.isArray(data?.types)
      ? this.getProjectTypes(data?.types)
      : new Set();
    this.languages = Array.isArray(data?.languages)
      ? this.getLanguages(data?.languages)
      : new Set();
    this.frameworks = Array.isArray(data?.frameworks)
      ? this.getFrameworks(data?.frameworks)
      : new Set();
    this.technologies = Array.isArray(data?.technologies)
      ? this.getTechnologies(data?.technologies)
      : new Set();
  }

  getProjectTypes(data: Array<Record<string, any>> = []) {
    let types: Set<Taxonomy> = new Set();

    data.forEach((type) => {
      types.add(new Taxonomy(type));
    });

    return types;
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
      console.log(technology)

      technologies.add(new Taxonomy(technology));
    });

    return technologies;
  }

  filter(taxonomy: string, term: string) {

    if (taxonomy === 'project-types') {
      for (const type of this.types) {
        if (type.id === term) {
          return type;
        }
      }
    }

    if (taxonomy === 'languages') {
      for (const language of this.languages) {
        if (language.id === term) {
          return language;
        }
      }
    }

    if (taxonomy === 'frameworks') {
      for (const framework of this.frameworks) {
        if (framework.id === term) {
          return framework;
        }
      }
    }

    if (taxonomy === 'technologies') {
      for (const technology of this.technologies) {
        if (technology.id === term) {
          return technology;
        }
      }
    }

    return new Taxonomy();
  }
}

export default Skills;
