import Model from './Model';
import ProjectSolution from './ProjectSolution';
import ProjectURLs from './ProjectURLs';
import ProjectProcess from './ProjectProcess';
import ProjectDesign from './ProjectDesign';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';
import ProjectProblem from './ProjectProblem';
import ProjectDetails from './ProjectDetails';
import Repo from './Repo';
import Gallery from './Gallery';
import Owner from './Owner';

import { DocumentData } from 'firebase/firestore';

class Project extends Model {
  id: string;
  owner: Owner;
  title: string;
  description: string;
  solution: ProjectSolution;
  process: ProjectProcess;
  problem: ProjectProblem;
  details: ProjectDetails;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id;
    this.owner = new Owner(data?.owner);
    this.title = data?.title ? this.getTitle(data?.id) : '';
    this.description = data?.description ?? 'No Description Provided.';
    this.solution = new ProjectSolution(data?.solution);
    this.process = new ProjectProcess(data?.process);
    this.problem = new ProjectProblem(data?.problem);
    this.details = new ProjectDetails(data?.details);
  }

  create(repo_url: string, title: string) {
    try {
      const parsedUrl = new URL(repo_url);
      const pathname = parsedUrl.pathname;
      const parts = pathname.split('/');
      const filteredArray = parts.filter((item) => item !== '');

      this.id = filteredArray[1];
      this.title = title;
      this.process.development.repoURL = repo_url;
    } catch (error) {
      const err = error as Error;
      console.error(err);
    }
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
    console.log(repo)
    this.id = repo.id;
    this.owner = repo.owner;
    this.title = this.title ? this.title : this.getTitle(this.id);
    this.description =
      repo.description !== '' ? repo.description : 'No Description Provided.';
    this.solution.urlsList.homepage.url = repo.homepage;
    this.solution.content = repo.contents.solution ? repo.contents.solution.downloadURL : null;
    this.process.status.createdAt = repo.createdAt;
    this.process.status.updatedAt = repo.updatedAt;
    this.process.design.content = repo.contents.design ? repo.contents.design.downloadURL : null;
    this.process.development.content = repo.contents.development ? repo.contents.development.downloadURL : null;
    this.process.development.repoURL = repo.repoURL;
    this.process.development.skills = repo.skills;
    this.process.delivery.content = repo.contents.delivery ? repo.contents.delivery.downloadURL : null;
    this.problem.content = repo.contents.problem ? repo.contents.problem.downloadURL : null;
  }

  fromDocumentData(id: string, data: DocumentData) {
    this.id = id;
    this.title = data?.title ? data.title : this.getTitle(this.id);
    this.solution.gallery = data?.solution?.gallery
      ? new Gallery(data.solution.gallery)
      : new Gallery();
    this.solution.currency = data?.solution?.currency;
    this.solution.features = data?.solution?.features;
    this.solution.price = data?.solution?.price;
    this.solution.urlsList = data?.solution?.urlsList
      ? new ProjectURLs()
      : new ProjectURLs();
    this.process.status.progress = data?.process?.status?.progress ?? '0';
    this.process.design = data?.process?.design
      ? new ProjectDesign(data.process.design)
      : new ProjectDesign();
    this.process.development = data?.process?.development
      ? new ProjectDevelopment(data.process.development)
      : new ProjectDevelopment();
    this.process.delivery = data?.process?.delivery
      ? new ProjectDelivery(data.process.delivery)
      : new ProjectDelivery();
    this.problem = data?.problem
      ? new ProjectProblem(data.problem)
      : new ProjectProblem();
    this.details = data?.details
      ? new ProjectDetails(data.details)
      : new ProjectDetails();
  }
}

export default Project;
