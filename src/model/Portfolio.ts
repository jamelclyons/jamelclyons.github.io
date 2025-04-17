import Model from '../model/Model';
import Project from './Project';
import Repo from './Repo';
import Repos from './Repos';

class Portfolio extends Model {
  projects: Set<Project>;
  size: number;

  constructor(repos: Repos) {
    super();

    this.projects =
      repos && repos.collection && repos.collection.length > 0
        ? this.getProjects(repos.collection)
        : new Set();
    this.size = this.getCount();
  }

  getProjects(repos: Array<Repo>) {
    let projects: Set<Project> = new Set();

    repos.forEach((repo) => {
      const project = new Project();
      project.fromRepo(repo);
      projects.add(project);
    });

    return projects;
  }

  getCount() {
    return this.projects.size;
  }

  getProjectsFromRepos(repos: Repos) {
    let repoProjectsObject: Array<Record<string, any>> = [];

    if (repos.count > 0) {
      repos.collection.forEach((repo) => {
        console.log(repo);
        let project = new Project();
        project.fromRepo(repo);
        repoProjectsObject.push(project.toObject());
      });
    }

    return repoProjectsObject;
  }

  getProjectsFromDB(docs: Array<Record<string, any>>) {
    let projects: Set<Project> = new Set();

    if (docs.length > 0) {
      this.projects.forEach((project) => {
        const matchingDoc = docs.find((doc) => doc.id === project.id);

        if (matchingDoc) {
          project.fromDocumentData(matchingDoc.data());
        }

        projects.add(project);
      });
    }

    this.projects = projects;
  }

  filterProjects(taxonomy: string, term: string): Set<Project> {
    let updatedProjects: Set<Project> = new Set();

    if (taxonomy && term) {
      Array.from(this.projects).forEach((project: Project) => {
        if (
          taxonomy === 'project-types' &&
          project?.process?.development?.skills?.types
        ) {
          project.process.development.skills.types.forEach((type) => {
            if (type.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy == 'languages' &&
          project?.process?.development?.skills?.languages
        ) {
          project.process.development.skills.languages.forEach((language) => {
            if (language.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'frameworks' &&
          project?.process?.development?.skills?.frameworks
        ) {
          project.process.development.skills.frameworks.forEach((framework) => {
            if (framework.id === term) {
              updatedProjects.add(project);
            }
          });
        }

        if (
          taxonomy === 'technologies' &&
          project?.process?.development?.skills?.technologies
        ) {
          project.process.development.skills.technologies.forEach(
            (technology) => {
              if (technology.id === term) {
                updatedProjects.add(project);
              }
            }
          );
        }

        if (
          taxonomy === 'services' &&
          project?.process?.development?.skills?.services
        ) {
          project.process.development.skills.services.forEach((service) => {
            if (service.id === term) {
              updatedProjects.add(project);
            }
          });
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

  filterProjectsByLogin(login: string): Set<Project> {
    let updatedProjects: Set<Project> = new Set();

    if (login) {
      Array.from(this.projects).forEach((project: Project) => {
        if (project?.owner?.login === login) {
          updatedProjects.add(project);
        }
      });
    }

    return updatedProjects;
  }
}

export default Portfolio;
