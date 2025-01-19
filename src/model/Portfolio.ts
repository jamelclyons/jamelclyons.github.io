import Model from '../model/Model';
import Project from './Project';
import Skills from './Skills';

class Portfolio extends Model {
  projects: Set<Project>;
  count: number = 0;

  constructor(projects: Array<Record<string, any>> = []) {
    super();

    this.projects = this.getProjects(projects);
    this.count = this.getCount();
  }

  getProjects(data: Array<Record<string, any>> = []) {
    let projects: Set<Project> = new Set();

    data.forEach((project) => {
      projects.add(new Project(project));
    });

    return projects;
  }

  filterProjects(taxonomy: string, term: string): Set<Project> {
    let updatedProjects: Set<Project> = new Set();

    if (taxonomy && term) {
      Array.from(this.projects).forEach((project: Project) => {
        if (taxonomy === 'project-types') {
          project.process.development.skills.types.forEach((type) => {
            if (type.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (taxonomy == 'languages') {
          Array.from(project.process.development.skills.languages).forEach(
            (language) => {
              if (language.id === term) {
                updatedProjects.add(project);
              }
            }
          );
        }

        if (taxonomy === 'frameworks') {
          project.process.development.skills.frameworks.forEach((framework) => {
            if (framework.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (taxonomy === 'technologies') {
          project.process.development.skills.technologies.forEach(
            (framework) => {
              if (framework.id === term) {
                updatedProjects.add(project);
              }
            }
          );
        }
      });
    }

    return updatedProjects;
  }

  filterProject(id: string): Project {
    let filteredProject = new Project();

    this.projects.forEach((project) => {
      if (project.id == id) {
        filteredProject = project;
      }
    });

    return filteredProject;
  }

  getCount() {
    return this.projects.size;
  }
}

export default Portfolio;
