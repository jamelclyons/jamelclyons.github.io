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
  count: number;

  constructor(data: Record<string, any> = []) {
    super();

    this.types = this.getProjectTypes(data.types || []);
    this.languages = this.getLanguages(data.languages || []);
    this.frameworks = this.getFrameworks(data.frameworks || []);
    this.technologies = this.getTechnologies(data.technologies || []);

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

  show(skillsUsed: Skills) {
    const filteredSkills: Skills = new Skills();

    if (skillsUsed.count > 0) {
      if (skillsUsed.types.size > 0) {
        skillsUsed.types.forEach((typeUsed) => {
          this.types.forEach((type) => {
            if (typeUsed.id === type.id) {
              filteredSkills.types.add(type);
            }
          });
        });
      }

      if (skillsUsed.languages.size > 0) {
        skillsUsed.languages.forEach((languageUsed) => {
          this.languages.forEach((language) => {
            if (languageUsed.id === language.id) {
              filteredSkills.languages.add(language);
            }
          });
        });
      }

      if (skillsUsed.frameworks.size > 0) {
        skillsUsed.frameworks.forEach((frameworkUsed) => {
          this.frameworks.forEach((framework) => {
            if (frameworkUsed.id === framework.id) {
              filteredSkills.frameworks.add(framework);
            }
          });
        });
      }

      if (skillsUsed.technologies.size > 0) {
        skillsUsed.technologies.forEach((technologyUsed) => {
          this.technologies.forEach((technology) => {
            if (technologyUsed.id === technology.id) {
              filteredSkills.technologies.add(technology);
            }
          });
        });
      }

      return filteredSkills;
    }

    return this;
  }

  getCount(): number {
    return (
      this.types.size +
      this.languages.size +
      this.frameworks.size +
      this.technologies.size
    );
  }
}

export default Skills;
