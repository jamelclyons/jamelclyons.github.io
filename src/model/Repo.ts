import Model from './Model';
import Owner from './Owner';
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
  contents: RepoContent = new RepoContent;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.name ?? data?.id ?? '';
    this.privacy = data?.private ?? '';
    this.owner = data?.owner ? new Owner(data.owner) : new Owner();
    this.createdAt = data?.created_at ?? '';
    this.updatedAt = data?.updated_at ?? '';
    this.homepage = data?.homepage ?? '';
    this.description = data?.description ?? '';
    this.repoURL = data?.repo_url ?? data?.url ?? data?.html_url ?? '';
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

  setContent() {}
}

export default Repo;
