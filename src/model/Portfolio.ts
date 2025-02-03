import Model from '../model/Model';
import Project from './Project';
import Repo from './Repo';

class Portfolio extends Model {
  projects: Set<Project>;

  constructor(projects: Array<Record<string, any>> = []) {
    super();

    this.projects = this.getProjects(projects);
  }

  getProjects(data: Array<Record<string, any>> = []) {
    let projects: Set<Project> = new Set();

    data.forEach((project) => {
      projects.add(new Project(project));
    });

    return projects;
  }

  getProjectsFromRepos(repos: Array<Repo>) {
    let repoProjects: Set<Project> = new Set();

    if (repos.length > 0) {
      repos.forEach((repo) => {
        let project = new Project();
        project.fromRepo(repo);
        repoProjects.add(project);
      });
    }

    this.projects = repoProjects;
  }

  getProjectsFromDB(docs: Array<Record<string, any>>) {
    let projects: Set<Project> = new Set();

    if (docs.length > 0) {
      this.projects.forEach((project) => {
        const matchingDoc = docs.find((doc) => doc.id === project.id);

        if (matchingDoc) {
          project.fromDocumentData(matchingDoc.id, matchingDoc.data());
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

  filterProjectsByLogin(login: string): Set<Project> {
    let updatedProjects: Set<Project> = new Set();

    if (login) {
      Array.from(this.projects).forEach((project: Project) => {
        if (project.owner.login === login) {
          updatedProjects.add(project);
        }
      });
    }

    return updatedProjects;
  }

  getCount(): number {
    return this.projects.size;
  }
}

export default Portfolio;
