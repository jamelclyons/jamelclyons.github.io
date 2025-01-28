import Model from './Model';
import Owner from './Owner';
import RepoContents from './RepoContents';
import RepoContent from './RepoContent';
import Skills from './Skills';
import { Language, Technology } from './Taxonomy';

class Repo extends Model {
  id: string;
  privacy: boolean;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  description: string;
  repoURL: string;
  skills: Skills;
  contents: RepoContents = new RepoContents;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.name ?? data?.id ?? '';
    this.privacy = data?.private ?? '';
    this.owner = data?.owner ? new Owner(data.owner) : new Owner();
    this.createdAt = data?.created_at ?? '';
    this.updatedAt = data?.updated_at ?? '';
    this.homepage = data?.homepage ?? '';
    this.description = data?.description ?? '';
    this.repoURL = data?.html_url ? data.html_url : '';
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
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

  setSkills(repoSkills: Array<Record<string, any>>) {
    let skills = new Skills();

    repoSkills.forEach(({ language, usage }) => {
      if (language === 'Dockerfile') {
        skills.technologies.add(
          new Technology({
            id: 'docker',
            title: 'Docker',
            icon_url: '',
            class_name: '',
            usage: usage,
          })
        );
      }

      if (language === 'SCSS') {
        skills.technologies.add(
          new Technology({
            id: 'sass',
            title: 'Sass',
            icon_url: '',
            class_name: '',
            usage: usage,
          })
        );
      }

      if (language === 'hack') {
        skills.languages.add(
          new Language({
            id: 'hack',
            title: 'Hack',
            icon_url: '',
            class_name: '',
            usage: usage,
          })
        );
      }

      if (
        language !== 'hack' &&
        language !== 'SCSS' &&
        language !== 'Dockerfile'
      )
        skills.languages.add(
          new Language({
            id: language.toLowerCase(),
            title: language.toUpperCase(),
            icon_url: '',
            class_name: '',
            usage: usage,
          })
        );
    });

    this.skills = skills;
  }

  setContents(contentsObject: Array<Record<string, any>>) {
    if (Array.isArray(contentsObject) && contentsObject.length > 0) {
      contentsObject.map((content) => {
        if (content.type === 'file') {
          if (content.name === 'TheSolution.md') {
            this.contents.setSolution(new RepoContent(content));
          }

          if (content.name === 'Design.md') {
            this.contents.setDesign(new RepoContent(content));
          }

          if (content.name === 'Development.md') {
            this.contents.setDevelopment(new RepoContent(content));
          }

          if (content.name === 'Delivery.md') {
            this.contents.setDelivery(new RepoContent(content));
          }

          if (content.name === 'TheProblem.md') {
            this.contents.setProblem(new RepoContent(content));
          }
        }
      });
    }
  }
}

export default Repo;
