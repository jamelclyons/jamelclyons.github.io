import Model from './Model';
import Owner from './Owner';
import Skills from './Skills';
import Taxonomy, { Language, Technology } from './Taxonomy';

class Repo extends Model {
  id: string;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
  homepage: string;
  description: string;
  repoURL: string;
  skills: Skills;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.name ?? data?.id ?? '';
    this.owner = new Owner(data?.owner);
    this.createdAt = data?.created_at ?? '';
    this.updatedAt = data?.updated_at ?? '';
    this.homepage = data?.homepage ?? '';
    this.description = data?.description ?? '';
    this.repoURL = data?.repo_url ?? data?.html_url ?? '';
    this.skills = data?.skills ? new Skills(data?.skills) : new Skills();
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

    repoSkills.forEach((repoSkill) => {
      if (repoSkill?.language === 'Dockerfile') {

        skills.technologies.add(
          new Technology({
            id: 'docker',
            title: 'Docker',
            icon_url: '',
            class_name: '',
            usage: repoSkill?.usage,
          })
        );
      }

      skills.languages.add(
        new Language({
          id: repoSkill?.language.toLowerCase(),
          title: repoSkill?.language.toUpperCase(),
          icon_url: '',
          class_name: '',
          usage: repoSkill?.usage,
        })
      );
    });

    this.skills = skills;
  }
}

export default Repo;
