import Model from './Model';
import ProjectSolution, {
  ProjectSolutionDataObject,
  ProjectSolutionObject,
} from './ProjectSolution';
import ProjectURLs, { ProjectURLsObject } from './ProjectURLs';
import ProjectProcess, {
  ProjectProcessDataObject,
  ProjectProcessObject,
} from './ProjectProcess';
import ProjectProblem, {
  ProjectProblemDataObject,
  ProjectProblemObject,
} from './ProjectProblem';
import ProjectDetails, {
  ProjectDetailsDataObject,
  ProjectDetailsObject,
} from './ProjectDetails';
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
import ProjectURL from './ProjectURL';

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

export type ProjectDataObject = {
  id: string;
  title: string;
  solution: ProjectSolutionDataObject;
  process: ProjectProcessDataObject;
  problem: ProjectProblemDataObject;
  owner: string;
  details: ProjectDetailsDataObject;
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
    this.owner = new Owner(data?.owner);
    this.details = new ProjectDetails(data?.details);
    this.problem = new ProjectProblem(data?.problem);
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

    this.solution.projectURLs.homepage = new ProjectURL({ url: repo.homepage });

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

    if (repo.contents?.details?.downloadURL) {
      this.details.setContentURL(repo.contents.details.downloadURL);
    }
  }

  fromDocumentData(data: DocumentData) {
    this.title = data?.title ? data.title : this.id;

    const projectURLsObject: ProjectURLsObject = {
      homepage: data?.solution?.project_urls?.homepage?.url
        ? new ProjectURL({
            url: data.solution.project_urls.homepage.url,
          }).toProjectURLObject()
        : this.solution.projectURLs.homepage
        ? this.solution.projectURLs.homepage.toProjectURLObject()
        : null,
      ios: data?.solution?.project_urls?.ios?.url
        ? new ProjectURL({
            url: data.solution.project_urls.ios.url,
          }).toProjectURLObject()
        : this.solution.projectURLs.ios
        ? this.solution.projectURLs.ios.toProjectURLObject()
        : null,
      android: data?.solution?.project_urls?.android?.url
        ? new ProjectURL({
            url: data.solution.project_urls.android.url,
          }).toProjectURLObject()
        : this.solution.projectURLs.android
        ? this.solution.projectURLs.android.toProjectURLObject()
        : null,
    };

    const solutionObject: ProjectSolutionObject = {
      gallery: data?.solution?.gallery
        ? new Gallery(data?.solution?.gallery).toGalleryObject()
        : this.solution.gallery.toGalleryObject(),
      features: data?.solution?.features ?? Array.from(this.solution.features),
      content_url: this.solution.contentURL
        ? this.solution.contentURL.toContentURLObject()
        : null,
      project_urls: new ProjectURLs(projectURLsObject).toProjectURLsObject(),
    };

    this.solution = new ProjectSolution(solutionObject);

    this.process.status.progress = data?.process?.status?.progress
      ? data.process.status.progress
      : '0';

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

    this.process.development.skills.addByID(data?.process?.development?.skills);

    const developmentObject: ProjectDevelopmentObject = {
      gallery: data?.process?.development?.gallery
        ? new Gallery(data?.process.development.gallery).toGalleryObject()
        : this.process.development.gallery.toGalleryObject(),
      repo_url: data?.process?.development?.repo_url
        ? data.process.development.repo_url
        : this.process.development.repoURL,
      content_url: this.process.development.contentURL
        ? this.process.development.contentURL.toContentURLObject()
        : null,
      skills: this.process.development.skills.toProjectSkillsObject(),
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
      whitepaper_url: this.problem.whitepaperURL
        ? this.problem.whitepaperURL.toDocumentURLObject()
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
      content: this.details.content
        ? this.details.content.toContentURLObject()
        : null,
      team_list: this.details.teamList.map((user) => user.toUserObject()),
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

  toProjectDataObject(): ProjectDataObject {
    return {
      id: this.id,
      owner: this.owner.id,
      title: this.title,
      solution: this.solution.toProjectSolutionDataObject(),
      process: this.process.toProjectProcessDataObject(),
      problem: this.problem.toProjectProblemDataObject(),
      details: this.details.toDetailsDataObject(),
    };
  }
}

export default Project;
