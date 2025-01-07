import Model from './Model';
import ProjectProcess from './ProjectProcess';
import ProjectSolution from './ProjectSolution';
import ProjectProblem from './ProjectProblem';
import ProjectDetails from './ProjectDetails';

import Repo from './Repo';

import { DocumentData } from 'firebase/firestore';
import ProjectDevelopment from './ProjectDevelopment';

class Project extends Model {
  id: string;
  owner: string;
  title: string;
  description: string;
  solution: ProjectSolution;
  process: ProjectProcess;
  problem: ProjectProblem;
  details: ProjectDetails;

  constructor(id: string = '', data: Record<string, any> = {}) {
    super();

    this.id = id;
    this.owner = data?.owner;
    this.title = data?.title ? this.getTitle(data?.id) : '';
    this.description = data?.description ?? 'No Description Provided.';
    this.solution = data?.solution
      ? new ProjectSolution(data.solution)
      : new ProjectSolution();
    this.process = data?.process
      ? new ProjectProcess(data.process)
      : new ProjectProcess();
    this.problem = data?.problem
      ? new ProjectProblem(data.problem)
      : new ProjectProblem();
    this.details = data?.details
      ? new ProjectDetails(data.details)
      : new ProjectDetails();
  }

  getTitle(id?: string): string {
    return id
      ? id
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')
      : '';
  }

  fromRepo(repo: Repo) {
    this.id = repo.id;
    this.owner = repo.owner;
    this.title = this.title ? this.title : this.getTitle(this.id);
    this.description = repo.description ?? 'No Description Provided.';
    this.solution.urlsList.homepage.url = repo.homepage;
    this.process.status.createdAt = repo.createdAt;
    this.process.status.updatedAt = repo.updatedAt;
    this.process.development.repoURL = repo.repoURL;
  }

  fromDocumentData(id: string, data: DocumentData) {
    this.id = id;
    this.title = data?.title ? data.title : this.getTitle(this.id);
    this.solution.content = data?.solution?.content;
    this.solution.currency = data?.solution?.content;
    this.solution.features = data?.solution?.features;
    this.solution.gallery = data?.solution?.gallery;
    this.solution.price = data?.solution?.price;
    this.solution.urlsList = data?.solution?.urlsList;
    this.process.status.progress = data?.process?.status?.progress ?? '0';
    this.process.development = data?.process?.development ? new ProjectDevelopment(data?.process?.development) : new ProjectDevelopment();
    this.problem = data?.problem
      ? new ProjectProblem(data.problem)
      : new ProjectProblem();
    this.details = data?.details
      ? new ProjectDetails(data.details)
      : new ProjectDetails();
  }
}

export default Project;
