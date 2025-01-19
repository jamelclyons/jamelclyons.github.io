import Model from './Model';
import Taxonomy, {
  Framework,
  Language,
  ProjectType,
  Technology,
} from './Taxonomy';

class Skills extends Model {
  types: Set<ProjectType>;
  languages: Set<Language>;
  frameworks: Set<Framework>;
  technologies: Set<Technology>;
  count: number = 0;

  constructor(data: Record<string, any> = []) {
    super();

    this.types = Array.isArray(data?.types)
      ? this.getProjectTypes(data.types)
      : new Set();
    this.languages = Array.isArray(data?.languages)
      ? this.getLanguages(data.languages)
      : new Set();
    this.frameworks = Array.isArray(data?.frameworks)
      ? this.getFrameworks(data.frameworks)
      : new Set();
    this.technologies = Array.isArray(data?.technologies)
      ? this.getTechnologies(data.technologies)
      : new Set();

    this.count = this.getCount();
  }

  getProjectTypes(data: Array<Record<string, any>> = []) {
    let types: Set<ProjectType> = new Set();

    data.forEach((type) => {
      types.add(new ProjectType(type));
    });

    return types;
  }

  getLanguages(data: Array<Record<string, any>> = []) {
    let languages: Set<Language> = new Set();

    data.forEach((language) => {
      languages.add(new Language(language));
    });

    return languages;
  }

  getFrameworks(data: Array<Record<string, any>> = []) {
    let frameworks: Set<Framework> = new Set();

    data.forEach((framework) => {
      frameworks.add(new Framework(framework));
    });

    return frameworks;
  }

  getTechnologies(data: Array<Record<string, any>> = []) {
    let technologies: Set<Technology> = new Set();

    data.forEach((technology) => {
      technologies.add(new Technology(technology));
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

  getCount() {
    return (
      this.types.size +
      this.languages.size +
      this.frameworks.size +
      this.technologies.size
    );
  }
}

export default Skills;
