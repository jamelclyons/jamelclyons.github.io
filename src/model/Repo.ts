import Model from './Model';
import Owner from './Owner';
import RepoContents from './RepoContents';
import RepoContent from './RepoContent';
import Skills from './Skills';
import { Language, Technology } from './Taxonomy';

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
    this.repoURL = data?.url ?? data?.repo_url;
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
    this.contents = data?.contents
      ? new RepoContents(
          new RepoContent(data.contents.solution),
          new RepoContent(data.contents.design),
          new RepoContent(data.contents.development),
          new RepoContent(data.contents.delivery),
          new RepoContent(data.contents.problem)
        )
      : new RepoContents();
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

    return {
      languages: Array.from(skills.languages).map((lang) => lang.toObject()),
      technologies: Array.from(skills.technologies).map((tech) =>
        tech.toObject()
      ),
    };
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
}

export default Repo;
