import Model from '../model/Model';
import Project from './Project';
import Skills from './Skills';

class Portfolio extends Model {
  projects: Set<Project>;
  skills: Skills;

  constructor(
    projects: Array<Record<string, any>> = [],
    skills: Skills = new Skills()
  ) {
    super();

    this.projects = this.getProjects(projects);
    this.skills = skills;
  }

  getProjects(data: Array<Record<string, any>> = []) {
    let projects: Set<Project> = new Set();

    data.forEach((project) => {
      projects.add(new Project(project));
    });

    return projects;
  }

  // filter projects

  // filter project
}

export default Portfolio;
