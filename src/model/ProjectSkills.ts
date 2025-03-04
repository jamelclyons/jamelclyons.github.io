import Model from './Model';
import Skills from './Skills';
import Taxonomy, {
  Framework,
  Language,
  ProjectType,
  ProjectTypeObject,
  TaxonomyObject,
  Technology,
} from './Taxonomy';

export type ProjectSkillsObject = {
  types: Array<ProjectTypeObject>;
  languages: Array<TaxonomyObject>;
  frameworks: Array<TaxonomyObject>;
  technologies: Array<TaxonomyObject>;
};

class ProjectSkills extends Model {
  types: Set<ProjectType>;
  languages: Set<Language>;
  frameworks: Set<Framework>;
  technologies: Set<Technology>;
  count: number;

  constructor(data: Record<string, any> | ProjectSkillsObject = {}) {
    super();

    this.types = this.getProjectTypes(data.types);
    this.languages = this.getLanguages(data.languages);
    this.frameworks = this.getFrameworks(data.frameworks);
    this.technologies = this.getTechnologies(data.technologies);

    this.count = this.getCount();
  }

  add(skills: ProjectSkills) {
    this.types = new Set([...this.types, ...skills.types]);
    this.languages = new Set([...this.languages, ...skills.languages]);
    this.frameworks = new Set([...this.frameworks, ...skills.frameworks]);
    this.technologies = new Set([...this.technologies, ...skills.technologies]);
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

  set(skills: ProjectSkills) {
    this.frameworks = skills.frameworks;
    this.languages = skills.languages;
    this.technologies = skills.technologies;
    this.types = skills.types;
  }

  show(skillsUsed: ProjectSkills): ProjectSkills {
    const filteredSkills: ProjectSkills = new ProjectSkills();
    const skills = new Skills();
    
    const { types, languages, frameworks, technologies } = skills;

    if (skillsUsed.count > 0) {
      if (skillsUsed.types.size > 0) {
        skillsUsed.types.forEach((typeUsed) => {
          types.forEach((type) => {
            if (typeUsed.id === type.id) {
              filteredSkills.types.add(type);
            }
          });
        });
      }

      if (skillsUsed.languages.size > 0) {
        skillsUsed.languages.forEach((languageUsed) => {
          languages.forEach((language) => {
            if (languageUsed.id === language.id) {
              filteredSkills.languages.add(language);
            }
          });
        });
      }

      if (skillsUsed.frameworks.size > 0) {
        skillsUsed.frameworks.forEach((frameworkUsed) => {
          frameworks.forEach((framework) => {
            if (frameworkUsed.id === framework.id) {
              filteredSkills.frameworks.add(framework);
            }
          });
        });
      }

      if (skillsUsed.technologies.size > 0) {
        skillsUsed.technologies.forEach((technologyUsed) => {
          technologies.forEach((technology) => {
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

  toProjectSkillsObject(): ProjectSkillsObject {
    return {
      types:
        this.types.size > 0
          ? Array.from(this.types).map((type) => type.toProjectTypeObject())
          : [],
      languages:
        this.languages.size > 0
          ? Array.from(this.languages).map((language) =>
              language.toLanguageObject()
            )
          : [],
      frameworks:
        this.frameworks.size > 0
          ? Array.from(this.frameworks).map((framework) =>
              framework.toFrameworkObject()
            )
          : [],
      technologies:
        this.technologies.size > 0
          ? Array.from(this.technologies).map((technology) =>
              technology.toTechnologyObject()
            )
          : [],
    };
  }
}

export default ProjectSkills;
