import Model from './Model';
import ProjectSolution, { ProjectSolutionObject } from './ProjectSolution';
import ProjectURLs from './ProjectURLs';
import ProjectProcess, { ProjectProcessObject } from './ProjectProcess';
import ProjectProblem, { ProjectProblemObject } from './ProjectProblem';
import ProjectDetails, { ProjectDetailsObject } from './ProjectDetails';
import ProjectSkills, { ProjectSkillsObject } from './ProjectSkills';
import ProjectVersions from './ProjectVersions';
import Repo from './Repo';
import Owner, { OwnerObject } from './Owner';
import Feature from './Feature';
import ProjectDesign, { ProjectDesignObject } from './ProjectDesign';
import Gallery from './Gallery';
import CheckList from './CheckList';
import Color from './Color';
import ProjectDevelopment, {
  ProjectDevelopmentObject,
} from './ProjectDevelopment';
import ProjectDelivery, { ProjectDeliveryObject } from './ProjectDelivery';

import { DocumentData } from 'firebase/firestore';

export type ProjectObject = {
  id: string;
  title: string;
  description: string;
  solution: ProjectSolutionObject;
  process: ProjectProcessObject;
  problem: ProjectProblemObject;
  owner: OwnerObject;
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

    if (repo.contents?.solution?.downloadURL) {
      this.solution.setContentURL(repo.contents.solution.downloadURL);
    }

    this.solution.projectURLs.homepage.url = repo.homepage;

    this.process.status.createdAt = repo.createdAt;
    this.process.status.updatedAt = repo.updatedAt;

    if (repo.contents?.design?.downloadURL) {
      this.process.design.setContentURL(repo.contents.design.downloadURL);
    }

    if (repo.contents?.development?.downloadURL) {
      this.process.development.setContentURL(
        repo.contents.development.downloadURL
      );
    }

    this.process.development.skills.add(repo.skills);
    this.process.development.repoURL = repo.repoURL;

    if (repo.contents?.delivery?.downloadURL) {
      this.process.delivery.setContentURL(repo.contents.delivery.downloadURL);
    }

    if (repo.contents?.problem?.downloadURL) {
      this.problem.setContentURL(repo.contents.problem.downloadURL);
    }

    this.owner = new Owner(repo.owner);

    this.details.teamList = repo.contributors.users;
  }

  fromDocumentData(data: DocumentData) {
    this.title = data?.title ? data.title : this.id;

    this.description = data?.description ? data.description : this.description;

    const solutionObject: ProjectSolutionObject = {
      gallery: data?.solution?.gallery
        ? new Gallery(data?.solution?.gallery).toGalleryObject()
        : this.solution.gallery.toGalleryObject(),
      features: data?.solution?.features ?? Array.from(this.solution.features),
      content_url: this.solution.contentURL
        ? this.solution.contentURL.toContentURLObject()
        : null,
      currency: data?.solution?.currency ?? this.solution.currency,
      price: data?.solution?.price ?? this.solution.price,
      project_urls: data?.project_urls
        ? new ProjectURLs(data.project_urls).toProjectURLsObject()
        : this.solution.projectURLs.toProjectURLsObject(),
    };

    this.solution = new ProjectSolution(solutionObject);

    const designObject: ProjectDesignObject = {
      gallery: data?.process.design.gallery
        ? new Gallery(data?.process.design.gallery).toGalleryObject()
        : this.process.design.gallery.toGalleryObject(),
      check_list: data?.process?.design?.check_list
        ? new CheckList(data?.process?.design?.check_list).toCheckListObject()
        : this.process.design.checkList.toCheckListObject(),
      colors_list: data?.process?.design?.colors_list
        ? Array.from(data?.process?.design?.colors_list).map((color) =>
            new Color(color as Record<string, any>).toColorObject()
          )
        : this.process.design.colorsList.map((color) => color.toColorObject()),
      content_url: this.process.design.contentURL
        ? this.process.design.contentURL.toContentURLObject()
        : null,
    };

    this.process.design = new ProjectDesign(designObject);

    const skillsObject: ProjectSkillsObject = data?.process?.development?.skills
      ? new ProjectSkills(
          data?.process?.development?.skills
        ).toProjectSkillsObject()
      : this.process.development.skills.toProjectSkillsObject();

    const developmentObject: ProjectDevelopmentObject = {
      gallery: data?.process?.development?.gallery
        ? new Gallery(data?.process.development.gallery).toGalleryObject()
        : this.process.development.gallery.toGalleryObject(),
      repo_url:
        data?.process?.development?.repo_url ??
        this.process.development.repoURL,
      content_url: this.process.development.contentURL
        ? this.process.development.contentURL.toContentURLObject()
        : null,
      skills: skillsObject,
      check_list: data?.process?.development?.check_list
        ? new CheckList(
            data?.process?.development?.check_list
          ).toCheckListObject()
        : this.process.development.checkList.toCheckListObject(),
      versions_list: data?.process?.development?.versions_list
        ? new ProjectVersions(
            data.process.development.versions_list
          ).toProjectVersionsObject()
        : this.process.development.versionsList.toProjectVersionsObject(),
    };

    this.process.development = new ProjectDevelopment(developmentObject);

    const deliveryObject: ProjectDeliveryObject = {
      check_list: data?.process?.delivery?.check_list
        ? new CheckList(data?.process?.delivery?.check_list).toCheckListObject()
        : this.process.delivery.checkList.toCheckListObject(),
      gallery: data?.process?.delivery?.gallery
        ? new Gallery(data?.process.delivery.gallery).toGalleryObject()
        : this.process.delivery.gallery.toGalleryObject(),
      content_url: this.process.delivery.contentURL
        ? this.process.delivery.contentURL.toContentURLObject()
        : null,
    };

    this.process.delivery = new ProjectDelivery(deliveryObject);

    const problemObject: ProjectProblemObject = {
      content_url: this.problem.contentURL
        ? this.problem.contentURL.toContentURLObject()
        : null,
      gallery: data?.problem.gallery
        ? new Gallery(data?.problem.gallery).toGalleryObject()
        : this.problem.gallery.toGalleryObject(),
    };

    this.problem = new ProjectProblem(problemObject);

    const ownerObject: OwnerObject = {
      id: data?.owner?.id ?? this.owner.id,
      type: data?.owner?.type ?? this.owner.type,
      login: data?.owner?.login ?? this.owner.login,
      name: data?.owner?.name ?? this.owner.name,
      company: data?.owner?.company ?? this.owner.company,
      email: data?.owner?.email ?? this.owner.email,
      avatar_url: data?.owner?.avatar_url ?? this.owner.avatarURL,
      url: data?.owner?.url ?? this.owner.url,
      repos_url: data?.owner?.repos_url ?? this.owner.reposURL,
    };

    this.owner = new Owner(ownerObject);

    const projectDetailsObject: ProjectDetailsObject = {
      privacy: data?.details?.privacy
        ? data.details.privacy
        : this.details.privacy,
      client_id: data?.details?.client_id
        ? data.details.client_id
        : this.details.clientID,
      client_name: data?.details?.client_name
        ? data.details.client_name
        : this.details.clientName,
      start_date: data?.details?.start_date
        ? data.details.start_date
        : this.process.status.createdAt,
      end_date: data?.details?.end_date
        ? data.details.end_date
        : this.process.status.updatedAt,
      content: this.details.content
        ? this.details.content.toContentURLObject()
        : null,
      team_list: data?.details?.team_list
        ? this.details
            .getTeamList(data.details.team_list)
            .map((user) => user.toUserObject())
        : this.details.teamList.map((user) => user.toUserObject()),
    };

    this.details = new ProjectDetails(projectDetailsObject);
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

  toProjectObject(): ProjectObject {
    return {
      id: this.id,
      owner: this.owner.toOwnerObject(),
      title: this.title,
      description: this.description,
      solution: this.solution.toProjectSolutionObject(),
      process: this.process.toProjectProcessObject(),
      problem: this.problem.toProjectProblemObject(),
      details: this.details.toDetailsObject(),
    };
  }
}

export default Project;
