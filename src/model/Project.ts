import Model from './Model';
import ProjectProcess from './ProjectProcess';
import ProjectSolution from './ProjectSolution';
import ProjectProblem from './ProjectProblem';
import ProjectDetails from './ProjectDetails';

import Repo from './Repo';

import { DocumentData } from 'firebase/firestore';

class Project extends Model {
  id: string;
  title: string;
  description: string;
  solution: ProjectSolution;
  process: ProjectProcess;
  problem: ProjectProblem;
  details: ProjectDetails;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id || '';
    this.title = data?.title ?? this.getTitle(data?.id);
    this.description = data?.description ?? 'No Description Provided.';
    this.solution = new ProjectSolution(data?.solution);
    this.process = new ProjectProcess(data?.process);
    this.problem = new ProjectProblem(data?.problem);
    this.details = new ProjectDetails(data?.details);
  }

  getTitle(id?: string): string {
    return id
      ? id
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')
      : '';
  }

  fromDocumentData(doc: DocumentData) {
    const data = doc.data() as Record<string, any>;
    
    this.id = doc.id;
    this.title = data.title;
    this.description = data.description;
    this.solution = new ProjectSolution(data.solution);
    this.process = new ProjectProcess(data.process);
    this.problem = new ProjectProblem(data.problem);
    this.details = new ProjectDetails(data.details);
  }

  fromRepo(repo: Repo) {
    this.id = repo.id;
    this.title = this.title ? this.title : this.getTitle(this.id);
    this.description = repo.description ?? 'No Description Provided.';
    this.solution.urlsList.homepage.url = repo.homepage;
    this.process.status.createdAt = repo.createdAt;
    this.process.status.updatedAt = repo.updatedAt;
    this.process.development.repoURL = repo.repoURL;
  }
}

export default Project;
