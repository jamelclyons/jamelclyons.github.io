import Model from './Model';
import ProjectSolution, { ProjectSolutionObject } from './ProjectSolution';
import ProjectURLs from './ProjectURLs';
import ProjectProcess, { ProjectProcessObject } from './ProjectProcess';
import ProjectDesign from './ProjectDesign';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';
import ProjectProblem, { ProjectProblemObject } from './ProjectProblem';
import ProjectDetails, { ProjectDetailsObject } from './ProjectDetails';
import Repo from './Repo';
import Gallery from './Gallery';
import Owner from './Owner';
import Feature from './Feature';

import { DocumentData } from 'firebase/firestore';
import ProjectSkills from './ProjectSkills';
import ProjectURL from './ProjectURL';
import ProjectStatus from './ProjectStatus';

export type ProjectObject = {
  id: string;
  title: string;
  description: string;
  solution: ProjectSolutionObject;
  process: ProjectProcessObject;
  problem: ProjectProblemObject;
  owner: Record<string, any>;
  details: ProjectDetailsObject;
};

class Project extends Model {
  id: string;
  title: string;
  description: string;
  solution: ProjectSolution;
  process: ProjectProcess;
  problem: ProjectProblem;
  owner: Owner;
  details: ProjectDetails;

  constructor(data: Record<string, any> | ProjectObject = {}) {
    super();

    this.id = data?.id;
    this.title = data?.title ? data.title : this.getTitle(data?.id);
    this.description = data?.description ?? 'No Description Provided.';
    this.solution = new ProjectSolution(data?.solution);
    this.process = new ProjectProcess(data?.process);
    this.problem = new ProjectProblem(data?.problem);
    this.owner = new Owner(data?.owner);
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

  setFeatures(featuresObject: Array<Record<string, any>>) {
    const features = new Set<Feature>();

    if (Array.isArray(featuresObject) && featuresObject.length > 0) {
      featuresObject.map((feature) => {
        features.add(new Feature(feature));
      });
    }

    return features;
  }

  fromRepo(repo: Repo) {
    const owner = new Owner(repo.owner);
    const solution = new ProjectSolution();
    const process = new ProjectProcess();
    const problem = new ProjectProblem();
    const details = new ProjectDetails();

    const projectURLs = new ProjectURLs();
    projectURLs.homepage = new ProjectURL({ url: repo.homepage });

    solution.projectURLs = projectURLs;
    solution.contentURL = repo.contents.solution.downloadURL;

    const status = new ProjectStatus();
    const design = new ProjectDesign();
    const development = new ProjectDevelopment();
    const delivery = new ProjectDelivery();

    status.createdAt = repo.createdAt;
    status.updatedAt = repo.updatedAt;

    design.contentURL = repo.contents.design.downloadURL;

    development.contentURL = repo.contents.development.downloadURL;
    development.skills = new ProjectSkills(repo.skills);
    development.repoURL = repo.repoURL;

    process.status = status;
    process.design = design;
    process.development = development;
    process.delivery = delivery;

    delivery.contentURL = repo.contents.delivery.downloadURL;

    problem.contentURL = repo.contents.problem?.downloadURL;

    details.teamList = repo.contributors.users;

    this.id = repo.id;
    this.title = this.title ? this.title : this.getTitle(this.id);
    this.description =
      repo.description !== '' ? repo.description : 'No Description Provided.';
    this.solution = solution;
    this.process = process;
    this.problem = problem;
    this.owner = owner;
    this.details = details;
  }

  fromDocumentData(data: DocumentData) {
    this.id = data?.id ? data.id : this.id;
    this.title = data?.title ? data.title : this.id;
    this.solution.gallery = data?.solution?.gallery
      ? new Gallery(data.solution.gallery)
      : new Gallery();
    this.solution.currency = data?.solution?.currency
      ? data.solution.currency
      : 'USD';
    this.solution.features =
      Array.isArray(data?.solution?.features) &&
      data?.solution?.features.length > 0
        ? this.setFeatures(data.solution.features)
        : new Set();
    this.solution.price = data?.solution?.price ? data.solution.price : 0;
    this.solution.projectURLs = data?.solution?.urlsList
      ? new ProjectURLs(data.solution.urlsList)
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

  toObject(): Record<string, any> {
    return {
      id: this.id,
      owner: this.owner.toObject(),
      title: this.title,
      description: this.description,
      solution: this.solution.toObject(),
      process: this.process.toObject(),
      problem: this.problem.toObject(),
      details: this.details.toObject(),
    };
  }
}

export default Project;
