import Model from './Model';
import Owner, { OwnerObject } from './Owner';
import RepoContents, { RepoContentsObject } from './RepoContents';
import RepoContent from './RepoContent';
import { Language, Technology } from './Taxonomy';
import Contributors, { ContributorsObject } from './Contributors';
import User from './User';
import ProjectSkills, { ProjectSkillsObject } from './ProjectSkills';

export interface RepoObject {
  id: string;
  privacy: boolean;
  size: number;
  owner: OwnerObject | null;
  created_at: string;
  updated_at: string;
  homepage: string;
  description: string;
  repo_url: string;
  skills: ProjectSkillsObject | null;
  contents: RepoContentsObject | null;
  contributors_url: string | null;
  contributors: ContributorsObject | null;
}

class Repo extends Model {
  id: string;
  privacy: boolean;
  size: number;
  owner: Owner | null;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  description: string;
  repoURL: string;
  skills: ProjectSkills | null;
  contents: RepoContents | null;
  contributorsURL: string;
  contributors: Contributors | null;

  constructor(data: Record<string, any> | RepoObject = {}) {
    super();

    this.id = data?.id;
    this.privacy = data?.privacy;
    this.size = data?.size;
    this.owner = data?.owner ? new Owner(data.owner) : null;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
    this.homepage = data?.homepage;
    this.description = data?.description;
    this.repoURL = data?.repo_url;
    this.skills = data?.skills ? this.getSkills(data.skills) : null;
    this.contents = data?.contents ? new RepoContents(data.contents) : null;
    this.contributorsURL = data?.contributors_url;
    this.contributors = new Contributors(
      this.setContributors(data?.contributors)
    );
  }

  fromGitHub(data: Record<string, any>) {
    this.id = data?.name;
    this.privacy = data?.private;
    this.size = data?.size;
    this.owner = data?.owner ? new Owner(data.owner) : null;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.pushed_at;
    this.homepage = data?.homepage;
    this.description = data?.description;
    this.repoURL = data?.html_url;
    this.contributorsURL = data?.contributors_url;
  }

  getOwner(data: Record<string, any>) {
    if (typeof data === 'object') {
      return data.login;
    }

    if (typeof data === 'string') {
      return data;
    }

    return '';
  }

  languagesFromGithub(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      let languages: Array<Record<string, any>> = [];

      data.forEach(({ language, usage }) => {
        let skill: Record<string, any> = {};

        if (language === 'Dockerfile') {
          skill = {
            type: 'technology',
            id: 'docker',
            title: 'Docker',
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        if (language === 'SCSS') {
          skill = {
            type: 'technology',
            id: 'sass',
            title: 'Sass',
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        if (language === 'hack') {
          skill = {
            type: 'language',
            id: 'hack',
            title: 'Hack',
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        if (
          language !== 'hack' &&
          language !== 'SCSS' &&
          language !== 'Dockerfile'
        ) {
          skill = {
            type: 'language',
            id: language.toLowerCase(),
            title: language.toUpperCase(),
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        languages.push(skill);
      });

      this.setSkills(languages);
    }
  }

  getSkills(repoSkills: Array<Record<string, any>>) {
    let types: Array<Record<string, any>> = [];
    let languages: Array<Record<string, any>> = [];
    let frameworks: Array<Record<string, any>> = [];
    let technologies: Array<Record<string, any>> = [];

    if (repoSkills && Array.isArray(repoSkills) && repoSkills.length > 0) {
      repoSkills.forEach((skill) => {
        if (skill.type === 'technology') {
          technologies.push(
            new Technology({
              id: skill.id,
              title: skill.title,
              icon_url: skill.icon_url,
              class_name: skill.class_name,
              usage: skill.usage,
            }).toObject()
          );
        }

        if (skill.type === 'language') {
          languages.push(
            new Language({
              id: skill.id.toLowerCase(),
              title: skill.title.toUpperCase(),
              icon_url: skill.icon_url,
              class_name: skill.class_name,
              usage: skill.usage,
            }).toObject()
          );
        }
      });
    }

    return new ProjectSkills({
      types: types,
      languages: languages,
      frameworks: frameworks,
      technologies: technologies,
    });
  }

  setSkills(repoSkills: Array<Record<string, any>>) {
    let types: Array<Record<string, any>> = [];
    let languages: Array<Record<string, any>> = [];
    let frameworks: Array<Record<string, any>> = [];
    let technologies: Array<Record<string, any>> = [];

    if (repoSkills && Array.isArray(repoSkills) && repoSkills.length > 0) {
      repoSkills.forEach((skill) => {
        if (skill.type === 'technology') {
          technologies.push(
            new Technology({
              id: skill.id,
              title: skill.title,
              icon_url: skill.icon_url,
              class_name: skill.class_name,
              usage: skill.usage,
            }).toObject()
          );
        }

        if (skill.type === 'language') {
          languages.push(
            new Language({
              id: skill.id.toLowerCase(),
              title: skill.title.toUpperCase(),
              icon_url: skill.icon_url,
              class_name: skill.class_name,
              usage: skill.usage,
            }).toObject()
          );
        }
      });
    }

    this.skills = new ProjectSkills({
      types: types,
      languages: languages,
      frameworks: frameworks,
      technologies: technologies,
    });
  }

  setContents(contentsObject: Record<string, any>) {
    if (
      contentsObject &&
      (contentsObject.solution ||
        contentsObject.design ||
        contentsObject.development ||
        contentsObject.delivery ||
        contentsObject.problem ||
        contentsObject.details ||
        contentsObject.story)
    ) {
      this.contents ? this.contents : (this.contents = new RepoContents());

      this.contents.setSolution(new RepoContent(contentsObject.solution));
      this.contents.setDesign(new RepoContent(contentsObject.design));
      this.contents.setDevelopment(new RepoContent(contentsObject.development));
      this.contents.setDelivery(new RepoContent(contentsObject.delivery));
      this.contents.setProblem(new RepoContent(contentsObject.problem));
      this.contents.setDetails(new RepoContent(contentsObject.details));
      this.contents.setStory(new RepoContent(contentsObject.story));
    }
  }

  filterContents(contentsObject: Array<Record<string, any>>) {
    const contents = new RepoContents();

    if (Array.isArray(contentsObject) && contentsObject.length > 0) {
      contentsObject.forEach((content) => {
        this.contents ? this.contents : (this.contents = new RepoContents());

        if (content.type === 'file') {
          switch (content.name) {
            case 'TheSolution.md':
              this.contents.setSolution(new RepoContent(content));
              break;
            case 'Design.md':
              this.contents.setDesign(new RepoContent(content));
              break;
            case 'Development.md':
              this.contents.setDevelopment(new RepoContent(content));
              break;
            case 'Delivery.md':
              this.contents.setDelivery(new RepoContent(content));
              break;
            case 'TheProblem.md':
              this.contents.setProblem(new RepoContent(content));
              break;
            case 'Details.md':
              this.contents.setDetails(new RepoContent(content));
              break;
            case 'Story.md':
              this.contents.setStory(new RepoContent(content));
              break;
          }
        }
      });
    }
  }

  contributorsFromGitHub(data?: Array<Record<string, any>>) {
    const contributors: Array<User> = [];

    if (data && Array.isArray(data) && data.length > 0) {
      data.forEach((contributor) => {
        const user = new User(contributor);
        contributors.push(user);
      });

      this.contributors
        ? this.contributors
        : (this.contributors = new Contributors());
      this.contributors.set(contributors);
    }
  }

  setContributors(data?: Array<Record<string, any>>) {
    if (data && Array.isArray(data) && data.length > 0) {
      const contributors: Array<User> = [];

      data.forEach((contributor) => {
        const user = new User(contributor);
        contributors.push(user);
      });

      return contributors;
    }
  }

  toRepoObject(): RepoObject {
    return {
      id: this.id,
      privacy: this.privacy,
      size: this.size,
      owner: this.owner ? this.owner.toOwnerObject() : null,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      homepage: this.homepage,
      description: this.description,
      repo_url: this.repoURL,
      skills: this.skills ? this.skills.toProjectSkillsObject() : null,
      contents: this.contents ? this.contents.toRepoContentsObject() : null,
      contributors_url: this.contributorsURL,
      contributors: this.contributors
        ? this.contributors.toContributorsObject()
        : null,
    };
  }
}

export default Repo;
