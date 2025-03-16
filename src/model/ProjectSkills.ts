import Model from './Model';
import Skills from './Skills';
import Taxonomy, {
  existsInSet,
  Framework,
  Language,
  ProjectType,
  ProjectTypeObject,
  Service,
  TaxonomyObject,
  Technology,
} from './Taxonomy';

export type ProjectSkillsObject = {
  types: Array<ProjectTypeObject>;
  languages: Array<TaxonomyObject>;
  frameworks: Array<TaxonomyObject>;
  technologies: Array<TaxonomyObject>;
  services: Array<TaxonomyObject>;
};

export type ProjectSkillsDataObject = {
  types: Array<string>;
  languages: Array<string>;
  frameworks: Array<string>;
  technologies: Array<string>;
  services: Array<string>;
};

class ProjectSkills extends Model {
  types: Set<ProjectType>;
  languages: Set<Language>;
  frameworks: Set<Framework>;
  technologies: Set<Technology>;
  services: Set<Service>;
  count: number;

  constructor(data: Record<string, any> | ProjectSkillsObject = {}) {
    super();

    this.types = this.getProjectTypes(data.types);
    this.languages = this.getLanguages(data.languages);
    this.frameworks = this.getFrameworks(data.frameworks);
    this.technologies = this.getTechnologies(data.technologies);
    this.services = this.getServices(data.services);

    this.count = this.getCount();
  }

  addByID(skillsData: ProjectSkillsDataObject) {
    const skills = new Skills();
    const typeSkills = Array.from(skills.types).filter((skill) =>
      skillsData.types.includes(skill.id)
    );
    const languageSkills = Array.from(skills.languages).filter((skill) =>
      skillsData.languages.includes(skill.id)
    );
    const frameworkSkills = Array.from(skills.frameworks).filter((skill) =>
      skillsData.frameworks.includes(skill.id)
    );
    const technologySkills = Array.from(skills.technologies).filter((skill) =>
      skillsData.technologies.includes(skill.id)
    );
    const serviceSkills = Array.from(skills.services).filter((skill) =>
      skillsData.services.includes(skill.id)
    );

    const projectSkills = new ProjectSkills();
    projectSkills.types = new Set(typeSkills);
    projectSkills.languages = new Set(languageSkills);
    projectSkills.frameworks = new Set(frameworkSkills);
    projectSkills.technologies = new Set(technologySkills);
    projectSkills.services = new Set(serviceSkills);

    this.add(projectSkills);
  }

  add(skills: ProjectSkills) {
    Array.from(skills.types).map((type) => {
      const exists = existsInSet(type, this.types);
      return exists ? this.types : this.types.add(type);
    });
    Array.from(skills.languages).map((language) => {
      const exists = existsInSet(language, this.languages);
      return exists ? this.languages : this.languages.add(language);
    });
    Array.from(skills.frameworks).map((framework) => {
      const exists = existsInSet(framework, this.frameworks);
      return exists ? this.frameworks : this.frameworks.add(framework);
    });
    Array.from(skills.technologies).map((technology) => {
      const exists = existsInSet(technology, this.technologies);
      return exists ? this.technologies : this.technologies.add(technology);
    });
    Array.from(skills.services).map((service) => {
      const exists = existsInSet(service, this.services);
      return exists ? this.services : this.services.add(service);
    });
  }

  getProjectTypes(data: Array<Record<string, any>> = []) {
    let types: Set<ProjectType> = new Set();

    if (data.length > 0) {
      data.forEach((type) => {
        types.add(new ProjectType(type));
      });
    }

    return types;
  }

  getLanguages(data: Array<Record<string, any>> = []) {
    let languages: Set<Language> = new Set();

    if (data.length > 0) {
      data.forEach((language) => {
        const lang = new Language(language);
        languages.add(lang);
      });
    }
    return languages;
  }

  getFrameworks(data: Array<Record<string, any>> = []) {
    let frameworks: Set<Framework> = new Set();

    if (data.length > 0) {
      data.forEach((framework) => {
        frameworks.add(new Framework(framework));
      });
    }

    return frameworks;
  }

  getTechnologies(data: Array<Record<string, any>> = []) {
    let technologies: Set<Technology> = new Set();

    if (data.length > 0) {
      data.forEach((technology) => {
        technologies.add(new Technology(technology));
      });
    }

    return technologies;
  }

  getServices(data: Array<Record<string, any>> = []) {
    let services: Set<Service> = new Set();

    if (data.length > 0) {
      data.forEach((service) => {
        services.add(new Service(service));
      });
    }

    return services;
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
      services:
        this.services.size > 0
          ? Array.from(this.services).map((service) =>
              service.toServiceObject()
            )
          : [],
    };
  }

  toProjectSkillsDataObject(): ProjectSkillsDataObject {
    return {
      types:
        this.types.size > 0
          ? Array.from(this.types).map((type) => type.id)
          : [],
      languages:
        this.languages.size > 0
          ? Array.from(this.languages).map((language) => language.id)
          : [],
      frameworks:
        this.frameworks.size > 0
          ? Array.from(this.frameworks).map((framework) => framework.id)
          : [],
      technologies:
        this.technologies.size > 0
          ? Array.from(this.technologies).map((technology) => technology.id)
          : [],
      services:
        this.services.size > 0
          ? Array.from(this.services).map((service) => service.id)
          : [],
    };
  }
}

export default ProjectSkills;
