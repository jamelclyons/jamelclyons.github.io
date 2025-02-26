import Model from './Model';
import ProjectSolution, { ProjectSolutionObject } from './ProjectSolution';
import ProjectURLs from './ProjectURLs';
import ProjectProcess, { ProjectProcessObject } from './ProjectProcess';
import ProjectProblem, { ProjectProblemObject } from './ProjectProblem';
import ProjectDetails, { ProjectDetailsObject } from './ProjectDetails';
import ProjectSkills from './ProjectSkills';
import ProjectVersions from './ProjectVersions';
import Repo from './Repo';
import Owner from './Owner';
import Feature from './Feature';

import { DocumentData } from 'firebase/firestore';

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
    this.id = repo.id;

    this.description = repo.description;

    this.solution.projectURLs.homepage.url = repo.homepage;
    this.solution.contentURL = repo.contents.solution.downloadURL;

    this.process.status.createdAt = repo.createdAt;
    this.process.status.updatedAt = repo.updatedAt;

    this.process.design.contentURL = repo.contents.design.downloadURL;

    this.process.development.contentURL = repo.contents.development.downloadURL;
    this.process.development.skills.add(repo.skills);
    this.process.development.repoURL = repo.repoURL;

    this.process.delivery.contentURL = repo.contents.delivery.downloadURL;

    this.problem.contentURL = repo.contents.problem?.downloadURL;

    this.owner = new Owner(repo.owner);

    this.details.teamList = repo.contributors.users;
  }

  fromDocumentData(data: DocumentData) {
    this.title = data?.title ? data.title : this.id;

    this.description = data?.description ? data.description : this.description;

    this.solution.gallery = data?.solution?.gallery;
    this.solution.features = data?.solution?.features;
    this.solution.contentURL = data?.solution?.content_url;
    this.solution.currency = data?.solution?.currency;
    this.solution.price = data?.solution?.price;
    this.solution.projectURLs = data?.project_urls
      ? new ProjectURLs(data.project_urls)
      : this.solution.projectURLs;

    this.process.status.progress = data?.process?.status?.progress
      ? data?.process?.status?.progress
      : '0';

    this.process.design.gallery = data?.process?.design?.gallery;
    this.process.design.checkList = data?.process?.design?.check_list;
    this.process.design.colorsList = data?.process?.design?.colors_list;
    this.process.design.contentURL = data?.process?.design?.content_url;

    this.process.development.repoURL = data?.process?.development?.repo_url;
    this.process.development.contentURL =
      data?.process?.development?.content_url;
    this.process.development.skills.add(
      new ProjectSkills(data?.process?.development?.skills)
    );
    this.process.development.checkList = data?.process?.development?.check_list;
    this.process.development.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : this.process.development.versionsList;

    this.process.delivery.checkList = data?.process?.delivery?.check_list;
    this.process.delivery.gallery = data?.process?.delivery?.gallery;
    this.process.delivery.contentURL = data?.process?.delivery?.content_url;

    this.problem.contentURL = data?.process?.problem?.content_url;
    this.problem.gallery = data?.problem?.gallery;

    this.owner = new Owner(data.owner);

    this.owner.id = data?.owner?.id ?? this.owner.id;
    this.owner.type = data?.owner?.type ?? this.owner.type;
    this.owner.login = data?.owner?.login ?? this.owner.login;
    this.owner.name = data?.owner?.name ?? this.owner.name;
    this.owner.company = data?.owner?.company ?? this.owner.company;
    this.owner.email = data?.owner?.email ?? this.owner.email;
    this.owner.avatarURL = data?.owner?.avatar_url ?? this.owner.avatarURL;
    this.owner.url = data?.owner?.url ?? this.owner.url;
    this.owner.reposURL = data?.owner?.repos_url ?? this.owner.reposURL;

    this.details.privacy = data?.details?.privacy ? data.details.privacy : this.details.privacy;
    this.details.clientID = data?.details?.client_id ? data.details.client_id : this.details.clientID;
    this.details.clientName = data?.details?.client_name ? data.details.client_name : this.details.clientName;
    this.details.startDate = data?.details?.start_date ? data.details.start_date : this.details.startDate;
    this.details.endDate = data?.details?.end_date ? data.details.end_date : this.details.endDate;
    this.details.content = data?.details?.content ? data.details.content : this.details.content;
    this.details.teamList = data?.details?.team_list ? this.details.getTeamList(data.team_list) : this.details.teamList;
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
