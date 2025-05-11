import Model from './Model';
import Taxonomy, {
  Framework,
  Language,
  ProjectType,
  Service,
  Technology,
} from './Taxonomy';
import * as skills from '../../skills.json';
import ProjectSkills from './ProjectSkills';

export type SkillsObject = {
  types: Array<Record<string, any>> | null;
  languages: Array<Record<string, any>> | null;
  frameworks: Array<Record<string, any>> | null;
  technologies: Array<Record<string, any>> | null;
  services: Array<Record<string, any>> | null;
};

class Skills extends Model {
  types: Set<ProjectType>;
  languages: Set<Language>;
  frameworks: Set<Framework>;
  technologies: Set<Technology>;
  services: Set<Service>;
  count: number;

  constructor(data: Record<string, any> | SkillsObject = []) {
    super();

    const { types, languages, frameworks, technologies, services } = skills;

    this.types = data?.types
      ? this.getProjectTypes(data.types)
      : this.getProjectTypes(types);
    this.languages = data?.languages
      ? this.getLanguages(data.languages)
      : this.getLanguages(languages);
    this.frameworks = data?.frameworks
      ? this.getFrameworks(data.frameworks)
      : this.getFrameworks(frameworks);
    this.technologies = data?.technologies
      ? this.getTechnologies(data.technologies)
      : this.getTechnologies(technologies);
    this.services = data?.services
      ? this.getServices(data.services)
      : this.getServices(services);

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

  getServices(data: Array<Record<string, any>> = []) {
    let services: Set<Service> = new Set();

    data.forEach((service) => {
      services.add(new Service(service));
    });

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

    if (taxonomy === 'services') {
      for (const service of this.services) {
        if (service.id === term) {
          return service;
        }
      }
    }

    return new Taxonomy();
  }

  show(skillsUsed: ProjectSkills) {
    const filteredSkills: ProjectSkills = new ProjectSkills();

    if (skillsUsed.types && skillsUsed.types.size > 0) {
      skillsUsed.types.forEach((typeUsed) => {
        this.types.forEach((type) => {
          if (typeUsed.id === type.id) {
            filteredSkills.types
              ? filteredSkills.types
              : (filteredSkills.types = new Set<ProjectType>());
            console.log(type);
            filteredSkills.types.add(type);
          }
        });
      });
    }

    if (skillsUsed.languages && skillsUsed.languages.size > 0) {
      skillsUsed.languages.forEach((languageUsed) => {
        this.languages.forEach((language) => {
          if (languageUsed.id === language.id) {
            filteredSkills.languages
              ? filteredSkills.languages
              : (filteredSkills.languages = new Set<Language>());
            filteredSkills.languages.add(language);
          }
        });
      });
    }

    if (skillsUsed.frameworks && skillsUsed.frameworks.size > 0) {
      skillsUsed.frameworks.forEach((frameworkUsed) => {
        this.frameworks.forEach((framework) => {
          if (frameworkUsed.id === framework.id) {
            filteredSkills.frameworks
              ? filteredSkills.frameworks
              : (filteredSkills.frameworks = new Set<Framework>());
            filteredSkills.frameworks.add(framework);
          }
        });
      });
    }

    if (skillsUsed.technologies && skillsUsed.technologies.size > 0) {
      skillsUsed.technologies.forEach((technologyUsed) => {
        this.technologies.forEach((technology) => {
          if (technologyUsed.id === technology.id) {
            filteredSkills.technologies
              ? filteredSkills.technologies
              : (filteredSkills.technologies = new Set<Technology>());
            filteredSkills.technologies.add(technology);
          }
        });
      });
    }

    if (skillsUsed.services && skillsUsed.services.size > 0) {
      skillsUsed.services.forEach((serviceUsed) => {
        this.services.forEach((service) => {
          if (serviceUsed.id === service.id) {
            filteredSkills.services
              ? filteredSkills.services
              : (filteredSkills.services = new Set<Service>());
            filteredSkills.services.add(service);
          }
        });
      });
    }

    return filteredSkills;
  }

  getCount(): number {
    return (
      this.types.size +
      this.languages.size +
      this.frameworks.size +
      this.technologies.size
    );
  }

  getAll() {
    return Array.from([
      ...this.types,
      ...this.languages,
      ...this.frameworks,
      ...this.technologies,
      ...this.services,
    ]);
  }

  toSkillsObject(): SkillsObject {
    return {
      types: this.types
        ? Array.from(this.types).map((type) => type.toTaxonomyObject())
        : null,
      languages: this.languages
        ? Array.from(this.languages).map((language) =>
            language.toTaxonomyObject()
          )
        : null,
      frameworks: this.frameworks
        ? Array.from(this.frameworks).map((framework) =>
            framework.toTaxonomyObject()
          )
        : null,
      technologies: this.technologies
        ? Array.from(this.technologies).map((technology) =>
            technology.toTaxonomyObject()
          )
        : null,
      services: this.services
        ? Array.from(this.services).map((service) => service.toTaxonomyObject())
        : null,
    };
  }
}

export default Skills;
