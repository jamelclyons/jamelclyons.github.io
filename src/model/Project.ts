import Model from './Model';
import ProjectSolution, {
  ProjectSolutionDataObject,
  ProjectSolutionObject,
} from './ProjectSolution';
import ProjectURLs from './ProjectURLs';
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
import ProjectVersions from './ProjectVersions';
import Repo from './Repo';
import Owner, { OwnerObject } from './Owner';
import Feature from './Feature';
import ProjectDesign from './ProjectDesign';
import Gallery from './Gallery';
import CheckList from './CheckList';
import Color from './Color';
import ProjectDevelopment, {
  ProjectDevelopmentObject,
} from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';
import ProjectStatus from './ProjectStatus';
import User from './User';
import ProjectProgress from './ProjectProgress';
import ProjectSkills from './ProjectSkills';
import RepoURL from './RepoURL';

export type ProjectObject = {
  id: string | null;
  title: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  description: string | null;
  solution: ProjectSolutionObject | null;
  process: ProjectProcessObject | null;
  problem: ProjectProblemObject | null;
  owner: OwnerObject | null;
  details: ProjectDetailsObject | null;
};

export type ProjectDataObject = {
  id: string | null;
  title: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  solution: ProjectSolutionDataObject | null;
  process: ProjectProcessDataObject | null;
  problem: ProjectProblemDataObject | null;
  owner: OwnerObject | null;
  details: ProjectDetailsDataObject | null;
};

class Project extends Model {
  id: string;
  title: string;
  subtitle: string | null;
  promotionalText: string | null;
  description: string | null;
  solution: ProjectSolution | null;
  process: ProjectProcess | null;
  problem: ProjectProblem | null;
  owner: Owner;
  details: ProjectDetails | null;

  constructor(data: Record<string, any> | ProjectObject = {}) {
    super();

    try {
      this.id = data?.id;
      this.title = data?.title ? data.title : this.getTitle(data.id);
      this.subtitle = data?.subtitle ?? null;
      this.promotionalText = data?.promotional_text ?? null;
      this.description = data?.description ?? null;
      this.solution = data?.solution
        ? new ProjectSolution(data.solution)
        : null;
      this.process = data?.process ? new ProjectProcess(data.process) : null;
      this.owner = data?.owner ? new Owner(data.owner) : new Owner();
      this.details = data?.details ? new ProjectDetails(data.details) : null;
      this.problem = data?.problem ? new ProjectProblem(data?.problem) : null;
    } catch (error) {
      let err = error as Error;
      throw new Error(err.message);
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

    if (repo.contents?.solution?.downloadURL || repo?.homepage) {
      this.solution = new ProjectSolution();
      repo.contents?.solution?.downloadURL
        ? this.solution.setContentURL(repo.contents.solution.downloadURL)
        : this.solution;

      repo?.homepage
        ? this.solution && this.solution.projectURLs
          ? this.solution.projectURLs.setHomepage(repo.homepage)
          : (this.solution.projectURLs = new ProjectURLs({
              homepage: repo.homepage,
            }))
        : this.solution;
    }

    if (
      repo.contents?.design?.downloadURL ||
      repo.createdAt ||
      repo.updatedAt
    ) {
      this.process ? this.process : (this.process = new ProjectProcess());

      this.process.status
        ? this.process.status
        : (this.process.status = new ProjectStatus());

      this.process.status.createdAt = repo.createdAt;
      this.process.status.updatedAt = repo.updatedAt;

      repo.contents?.design?.downloadURL
        ? this.process.design
          ? this.process.design.setContentURL(repo.contents.design.downloadURL)
          : (this.process.design = new ProjectDesign({
              content_url: repo.contents.design.downloadURL,
            }))
        : this.process;

      if (
        repo.contents?.development?.downloadURL ||
        repo.skills ||
        repo.repoURL
      ) {
        this.process.development = new ProjectDevelopment();
        repo.contents?.development?.downloadURL
          ? this.process.development.setContentURL(
              repo.contents.development.downloadURL
            )
          : this.process.development;

        if (repo.skills) {
          this.process.development.skills
            ? this.process.development.skills
            : (this.process.development.skills = new ProjectSkills());

          this.process.development.skills.add(repo.skills);
        }

        if (repo.repoURL) {
          this.process.development.repoURL = new RepoURL(repo.repoURL);
        }
      }

      if (repo.contents?.delivery?.downloadURL) {
        this.process.delivery = new ProjectDelivery();
        this.process.delivery.setContentURL(repo.contents.delivery.downloadURL);
      }
    }

    if (repo.contents?.problem?.downloadURL) {
      this.problem = new ProjectProblem();
      this.problem.setContentURL(repo.contents.problem.downloadURL);
    }

    if (repo.owner) {
      this.owner = repo.owner;
    }

    if (repo.contributors?.users) {
      this.details = new ProjectDetails();
      this.details.teamList = repo.contributors.users;
    }

    if (repo.contents?.details?.downloadURL) {
      this.details = new ProjectDetails();
      this.details.setContentURL(repo.contents.details.downloadURL);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    this.title = data?.title ? data.title : this.id;

    if (data?.solution) {
      this.solution ? this.solution : (this.solution = new ProjectSolution());

      if (data?.solution?.project_urls) {
        this.solution.projectURLs
          ? this.solution.projectURLs
          : (this.solution.projectURLs = new ProjectURLs());

        data.solution.project_urls?.homepage
          ? this.solution.projectURLs.setHomepage(
              data.solution.project_urls.homepage
            )
          : null;

        data.solution.project_urls?.ios
          ? this.solution.projectURLs?.setIos(data.solution.project_urls.ios)
          : null;

        data.solution.project_urls?.android
          ? this.solution.projectURLs?.setAndroid(
              data.solution.project_urls.android
            )
          : null;
      }

      data.solution?.gallery
        ? (this.solution.gallery = new Gallery(data?.solution?.gallery))
        : null;

      data.solution?.features
        ? this.solution.setFeatures(data?.solution?.features)
        : null;
    }

    if (data?.process) {
      this.process ? this.process : (this.process = new ProjectProcess());

      if (data.process?.status) {
        this.process.status
          ? this.process.status
          : (this.process.status = new ProjectStatus());

        data.process.status?.progress
          ? (this.process.status.progress = new ProjectProgress(
              data.process.status?.progress
            ))
          : null;
      }

      if (data?.process.design) {
        this.process.design
          ? this.process.design
          : (this.process.design = new ProjectDesign());

        data?.process.design.gallery
          ? (this.process.design.gallery = new Gallery(
              data?.process.design.gallery
            ))
          : null;

        data?.process?.design?.check_list
          ? (this.process.design.checkList = new CheckList(
              data.process.design.check_list
            ))
          : null;

        data?.process?.design?.colors_list
          ? (this.process.design.colorsList = Array.from(
              data?.process?.design?.colors_list
            ).map((color) => new Color(color as Record<string, any>)))
          : null;
      }

      if (data?.process?.development) {
        this.process.development
          ? this.process.development
          : (this.process.development = new ProjectDevelopment());

        if (data?.process?.development?.skills) {
          this.process.development.skills
            ? this.process.development.skills
            : (this.process.development.skills = new ProjectSkills());
          this.process.development.skills.addByID(
            data?.process?.development?.skills
          );
        }

        if (data?.process?.development?.gallery) {
          this.process.development.gallery = new Gallery(
            data?.process.development.gallery
          );
        }

        if (data?.process?.development?.repo_url) {
          this.process.development.repoURL = new RepoURL(
            data.process.development.repo_url
          );
        }

        if (data?.process?.development?.check_list) {
          this.process.development.checkList = new CheckList(
            data.process.development.check_list
          );
        }

        if (data?.process?.development?.versions_list) {
          this.process.development.versionsList = new ProjectVersions(
            data.process.development.versions_list
          );
        }
      }

      if (data?.process?.delivery) {
        this.process.delivery
          ? this.process.delivery
          : (this.process.delivery = new ProjectDelivery());

        data?.process?.delivery?.check_list
          ? (this.process.delivery.checkList = new CheckList(
              data?.process?.delivery?.check_list
            ))
          : null;

        data?.process?.delivery?.gallery
          ? (this.process.delivery.gallery = new Gallery(
              data?.process.delivery.gallery
            ))
          : null;
      }
    }

    if (data?.problem) {
      this.problem ? this.problem : (this.problem = new ProjectProblem());

      data.problem?.gallery
        ? (this.problem.gallery = new Gallery(data?.problem.gallery))
        : null;

      data.problem.whitepaper_url
        ? this.problem.setWhitepaperURL(data?.problem.whitepaper_url)
        : null;
    }

    // if (data?.owner) {
    //   this.owner ? this.owner : (this.owner = new Owner());

    //   data?.owner?.id ? (this.owner.id = data.owner.id) : null;

    //   data?.owner?.type ? (this.owner.type = data.owner.type) : null;

    //   data?.owner?.login ? (this.owner.login = data.owner.login) : null;

    //   data?.owner?.name ? (this.owner.name = data.owner.name) : null;

    //   data?.owner?.company ? (this.owner.company = data.owner.company) : null;

    //   data?.owner?.email ? (this.owner.email = data.owner.email) : null;

    //   data?.owner?.avatar_url
    //     ? (this.owner.avatarURL = data.owner.avatar_url)
    //     : null;

    //   data?.owner?.url ? (this.owner.url = data.owner.url) : null;

    //   data?.owner?.repos_url
    //     ? (this.owner.reposURL = data.owner.repos_url)
    //     : null;
    // }

    if (data?.details) {
      this.details ? this.details : (this.details = new ProjectDetails());

      data.details?.privacy
        ? (this.details.privacy = data.details.privacy)
        : null;

      data.details?.client_id
        ? this.details.setClientID(data.details.client_id)
        : null;

      data.details?.team_list
        ? data.details?.team_list.map((user) => new User({ id: user }))
        : null;
    }
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      owner: this.owner ? this.owner.toObject() : null,
      title: this.title,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      description: this.description,
      solution: this.solution ? this.solution.toObject() : null,
      process: this.process ? this.process.toObject() : null,
      problem: this.problem ? this.problem.toObject() : null,
      details: this.details ? this.details.toObject() : null,
    };
  }

  toProjectObject(): ProjectObject {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      description: this.description,
      solution: this.solution ? this.solution.toProjectSolutionObject() : null,
      process: this.process ? this.process.toProjectProcessObject() : null,
      problem: this.problem ? this.problem.toProjectProblemObject() : null,
      details: this.details ? this.details.toDetailsObject() : null,
      owner: this.owner ? this.owner.toOwnerObject() : null,
    };
  }

  toProjectDataObject(): ProjectDataObject {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      solution: this.solution
        ? this.solution.toProjectSolutionDataObject()
        : null,
      process: this.process ? this.process.toProjectProcessDataObject() : null,
      problem: this.problem ? this.problem.toProjectProblemDataObject() : null,
      details: this.details ? this.details.toDetailsDataObject() : null,
      owner: this.owner ? this.owner.toOwnerObject() : null,
    };
  }
}

export default Project;
