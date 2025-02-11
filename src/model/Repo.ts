import Model from './Model';
import Owner from './Owner';
import RepoContents from './RepoContents';
import RepoContent from './RepoContent';
import Skills from './Skills';
import { Language, Technology } from './Taxonomy';
import Contributors from './Contributors';
import User from './User';

class Repo extends Model {
  id: string;
  privacy: boolean;
  size: number;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  description: string;
  repoURL: string;
  skills: Skills = new Skills();
  contents: RepoContents = new RepoContents();
  contributorsURL: string;
  contributors: Contributors = new Contributors();

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.name ?? data?.id ?? '';
    this.privacy = data?.private ?? '';
    this.size = data?.size ?? 0;
    this.owner = data?.owner ? new Owner(data.owner) : new Owner();
    this.createdAt = data?.created_at ?? '';
    this.updatedAt = data?.updated_at ?? '';
    this.homepage = data?.homepage ?? '';
    this.description = data?.description ?? '';
    this.repoURL = data?.html_url ?? data?.repo_url;
    this.skills = data?.skills ? this.getSkills(data.skills) : new Skills();
    this.contents = data?.contents
      ? new RepoContents(
          new RepoContent(data.contents.solution),
          new RepoContent(data.contents.design),
          new RepoContent(data.contents.development),
          new RepoContent(data.contents.delivery),
          new RepoContent(data.contents.problem)
        )
      : new RepoContents();
    this.contributorsURL = data?.contributors_url;
    this.setContributors(data?.contributors);
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
    if (Array.isArray(data) && data.length) {
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

      return languages;
    }

    return [];
  }

  getSkills(repoSkills: Array<Record<string, any>>) {
    if (repoSkills && Array.isArray(repoSkills) && repoSkills.length > 0) {
      let types: Array<Record<string, any>> = [];
      let languages: Array<Record<string, any>> = [];
      let frameworks: Array<Record<string, any>> = [];
      let technologies: Array<Record<string, any>> = [];

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

      return new Skills({
        types: types,
        languages: languages,
        frameworks: frameworks,
        technologies: technologies,
      });
    }

    return new Skills();
  }

  setContents(contentsObject: Record<string, any>) {
    this.contents.setSolution(new RepoContent(contentsObject.solution));
    this.contents.setDesign(new RepoContent(contentsObject.design));
    this.contents.setDevelopment(new RepoContent(contentsObject.development));
    this.contents.setDelivery(new RepoContent(contentsObject.delivery));
    this.contents.setProblem(new RepoContent(contentsObject.problem));
  }

  filterContents(contentsObject: Array<Record<string, any>>) {
    const contents: Record<string, any> = {};

    if (Array.isArray(contentsObject) && contentsObject.length > 0) {
      contentsObject.forEach((content) => {
        if (content.type === 'file') {
          switch (content.name) {
            case 'TheSolution.md':
              contents.solution = new RepoContent(content).toObject();
              break;
            case 'Design.md':
              contents.design = new RepoContent(content).toObject();
              break;
            case 'Development.md':
              contents.development = new RepoContent(content).toObject();
              break;
            case 'Delivery.md':
              contents.delivery = new RepoContent(content).toObject();
              break;
            case 'TheProblem.md':
              contents.problem = new RepoContent(content).toObject();
              break;
          }
        }
      });
    }

    return contents;
  }

  contributorsFromGitHub(data?: Array<Record<string, any>>) {
    if (data && Array.isArray(data) && data.length > 0) {
      const contributors: Array<Record<string, any>> = [];

      data.forEach((contributor) => {
        const user = new User(contributor).toObject();
        contributors.push(user);
      });

      return contributors;
    }

    return [];
  }

  setContributors(data?: Array<Record<string, any>>) {
    if (data && Array.isArray(data) && data.length > 0) {
      const contributors: Array<User> = [];

      data.forEach((contributor) => {
        const user = new User(contributor);
        contributors.push(user);
      });

      this.contributors = new Contributors(contributors);
    }
  }
}

export default Repo;
