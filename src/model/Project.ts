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
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';
import ProjectStatus from './ProjectStatus';
import User from './User';
import ProjectProgress from './ProjectProgress';
import ProjectSkills from './ProjectSkills';
import RepoURL from './RepoURL';
import Issue from './Issue';
import Task from './Task';
import ProjectQuery from './ProjectQuery';

export type ProjectObject = {
  id: string | null;
  name: string | null;
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
  id: string | null;
  name: string | null;
  title: string | null;
  subtitle: string | null;
  promotionalText: string | null;
  description: string | null;
  solution: ProjectSolution | null;
  process: ProjectProcess | null;
  problem: ProjectProblem | null;
  owner: Owner;
  details: ProjectDetails | null;
  query: ProjectQuery | null;

  constructor(data?: ProjectObject) {
    super();

    try {
      this.id = data?.id ? data.id : null;
      this.name = data?.name ? data.name : null;
      this.title = data?.title
        ? data.title
        : this.name
        ? this.getTitle(this.name)
        : null;
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
      this.query =
        this.owner.login && this.name
          ? new ProjectQuery(this.owner.login, this.name)
          : null;
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
    this.name = repo.name;
    this.title = this.title
      ? this.title
      : this.getTitle(this.name || 'Untitled Project');
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
      (repo.contents &&
        repo.contents.design &&
        repo.contents.design.size > 0 &&
        repo.contents.design.downloadURL) ||
      repo.createdAt ||
      repo.updatedAt
    ) {
      this.process ? this.process : (this.process = new ProjectProcess());

      this.process.status
        ? this.process.status
        : (this.process.status = new ProjectStatus());

      this.process.status.createdAt = repo.createdAt;
      this.process.status.updatedAt = repo.updatedAt;

      if (repo.contents && repo.contents.design) {
        this.process.design
          ? this.process.design
          : (this.process.design = new ProjectDesign());

        repo.contents.design.downloadURL
          ? this.process.design.setContentURL(repo.contents.design.downloadURL)
          : null;
      }

      let features = null;
      let tasks = null;
      let designIssues = null;
      let developmentIssues = null;
      let deliveryIssues = null;

      if (repo.issues && repo.issues.list && repo.issues.list.length > 0) {
        features = repo.issues.list.filter(
          (issue) => issue.type && issue.type.includes('Feature')
        );
        tasks = repo.issues.list.filter(
          (issue) => issue.type && issue.type.includes('Task')
        );
        designIssues = tasks.filter(
          (issue) => issue.labels && issue.labels.includes('design')
        );
        developmentIssues = tasks.filter(
          (issue) => issue.labels && issue.labels.includes('development')
        );
        deliveryIssues = tasks.filter(
          (issue) => issue.labels && issue.labels.includes('delivery')
        );
      }

      if (designIssues) {
        const designTask = designIssues
          .map((issue) => {
            if (issue.id && issue.title && issue.state) {
              const task = new Task();
              task.fromIssue(issue);
              return task;
            }
            return null;
          })
          .filter((task): task is Task => task !== null);

        if (designTask.length > 0) {
          this.process.design
            ? this.process.design
            : (this.process.design = new ProjectDesign());
          this.process.design.setCheckList(designTask);
        }
      }

      if (developmentIssues) {
        const developmentTask = developmentIssues
          .map((issue) => {
            if (issue.id && issue.title && issue.state) {
              const task = new Task();
              task.fromIssue(issue);
              return task;
            }
            return null;
          })
          .filter((task): task is Task => task !== null);

        if (developmentTask.length > 0) {
          this.process.development
            ? this.process.development
            : (this.process.development = new ProjectDevelopment());
          this.process.development.setCheckList(developmentTask);
        }
      }

      if (deliveryIssues) {
        const deliveryTask = deliveryIssues
          .map((issue) => {
            if (issue.id && issue.title && issue.state) {
              const task = new Task();
              task.fromIssue(issue);
              return task;
            }
            return null;
          })
          .filter((task): task is Task => task !== null);

        if (deliveryTask.length > 0) {
          this.process.delivery
            ? this.process.delivery
            : (this.process.delivery = new ProjectDelivery());
          this.process.delivery.setCheckList(deliveryTask);
        }
      }

      if (
        (repo.contents &&
          repo.contents.development &&
          repo.contents.development.size > 0 &&
          repo.contents?.development?.downloadURL) ||
        repo.skills ||
        repo.repoURL
      ) {
        this.process.development
          ? this.process.development
          : (this.process.development = new ProjectDevelopment());
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

        if (features) {
          this.solution
            ? this.solution
            : (this.solution = new ProjectSolution());
          const roadMap = features
            .filter((issue) => issue.id && issue.title && issue.milestone)
            .map((issue) => {
              const feature = new Feature();
              issue.id ? feature.setID(issue.id) : null;
              issue.title ? feature.setDescription(issue.title) : null;
              issue.milestone ? feature.setVersion(issue.milestone) : null;
              return feature;
            });
          this.solution.features =
            roadMap && Array.isArray(roadMap) && roadMap.length > 0
              ? new Set(roadMap)
              : null;
        }
      }

      if (
        repo.contents &&
        repo.contents.delivery &&
        repo.contents.delivery.size > 0 &&
        repo.contents.delivery.downloadURL
      ) {
        this.process.delivery
          ? this.process.delivery
          : (this.process.delivery = new ProjectDelivery());
        this.process.delivery.setContentURL(repo.contents.delivery.downloadURL);
      }
    }

    if (
      repo.contents &&
      repo.contents.problem &&
      repo.contents.problem.size > 0 &&
      repo.contents.problem.downloadURL
    ) {
      this.problem ? this.problem : (this.problem = new ProjectProblem());
      this.problem.setContentURL(repo.contents.problem.downloadURL);
    }

    if (repo.owner) {
      this.owner = repo.owner;
    }

    if (repo.contributors?.list) {
      this.details ? this.details : (this.details = new ProjectDetails());
      this.details.teamList = repo.contributors.list;
    }

    if (
      (repo.contents &&
        repo.contents.details &&
        repo.contents.details.size > 0 &&
        repo.contents.details?.downloadURL) ||
      (repo.contents &&
        repo.contents.story &&
        repo.contents.story.size > 0 &&
        repo.contents.story.downloadURL) ||
      (repo.size && repo.size > 0) ||
      (repo.contributors && repo.contributors.list.length > 0)
    ) {
      this.details = new ProjectDetails();
      repo.contents?.details?.downloadURL
        ? this.details.setContentURL(repo.contents.details.downloadURL)
        : null;
      repo.contents?.story?.downloadURL
        ? this.details.setStory(repo.contents.story.downloadURL)
        : null;
      repo.size && repo.size > 0 ? this.details.setRepoSize(repo.size) : null;
      repo.contributors && repo.contributors.list.length > 0
        ? this.details.setTeamList(repo.contributors.list)
        : null;
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

        data.process.design.gallery &&
        ((data.process.design.gallery.animations &&
          data.process.design.gallery.animations?.length > 0) ||
          (data.process.design.gallery.icons &&
            data.process.design.gallery.icons.length > 0) ||
          (data.process.design.gallery.logos &&
            data.process.design.gallery.logos.length > 0) ||
          (data.process.design.gallery.previews &&
            data.process.design.gallery.previews.length > 0) ||
          (data.process.design.gallery.screenshots &&
            data.process.design.gallery.screenshots.length > 0) ||
          (data.process.design.gallery.uml_diagrams &&
            data.process.design.gallery.uml_diagrams.length > 0))
          ? (this.process.design.gallery = new Gallery(
              data?.process.design.gallery
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

        if (
          data.process.development.gallery &&
          ((data.process.development.gallery.animations &&
            data.process.development.gallery.animations?.length > 0) ||
            (data.process.development.gallery.icons &&
              data.process.development.gallery.icons.length > 0) ||
            (data.process.development.gallery.logos &&
              data.process.development.gallery.logos.length > 0) ||
            (data.process.development.gallery.previews &&
              data.process.development.gallery.previews.length > 0) ||
            (data.process.development.gallery.screenshots &&
              data.process.development.gallery.screenshots.length > 0) ||
            (data.process.development.gallery.uml_diagrams &&
              data.process.development.gallery.uml_diagrams.length > 0))
        ) {
          this.process.development.gallery = new Gallery(
            data?.process.development.gallery
          );
        }

        if (data?.process?.development?.repo_url) {
          this.process.development.repoURL = new RepoURL(
            data.process.development.repo_url
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

        data.process.delivery.gallery &&
        ((data.process.delivery.gallery.animations &&
          data.process.delivery.gallery.animations?.length > 0) ||
          (data.process.delivery.gallery.icons &&
            data.process.delivery.gallery.icons.length > 0) ||
          (data.process.delivery.gallery.logos &&
            data.process.delivery.gallery.logos.length > 0) ||
          (data.process.delivery.gallery.previews &&
            data.process.delivery.gallery.previews.length > 0) ||
          (data.process.delivery.gallery.screenshots &&
            data.process.delivery.gallery.screenshots.length > 0) ||
          (data.process.delivery.gallery.uml_diagrams &&
            data.process.delivery.gallery.uml_diagrams.length > 0))
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

    if (data?.details) {
      this.details ? this.details : (this.details = new ProjectDetails());

      data.details?.privacy
        ? (this.details.privacy = data.details.privacy)
        : null;

      data.details?.client_id
        ? this.details.setClientID(data.details.client_id)
        : null;

      // data.details?.team_list
      //   ? data.details?.team_list.map((userID) => {
      //       const usr = new User();
      //       usr.setID(userID);
      //       return usr;
      //     })
      //   : null;
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
      name: this.name,
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
