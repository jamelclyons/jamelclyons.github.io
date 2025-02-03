import Model from './Model';
import ContactMethods from './ContactMethods';
import Repos from './Repos';

import user from '../../user.json';

class Organization extends Model {
  id: string;
  createdAt: string;
  updatedAt: string;
  avatarURL: string;
  login: string;
  description: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  url: string;
  github: string;
  contactMethods: ContactMethods = new ContactMethods();
  reposURL: string;
  repos: Repos;

  constructor(data: Record<string, any> = {}) {
    super();

    const { company } = user;

    this.id = data?.id;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
    this.login = data?.login;
    this.avatarURL = data?.avatar_url;
    this.description = data?.description;
    this.name = data?.name;
    this.company = data?.company || company;
    this.blog = data?.blog ? data.blog : '';
    this.location = data?.location;
    this.email = data?.email;
    this.url = data?.url;
    this.github = data?.html_url;

    const x = data?.x;

    this.contactMethods = new ContactMethods(
      '',
      '',
      x,
      '',
      this.github,
      this.blog,
      this.email,
      ''
    );

    this.reposURL = data?.repos_url;
    this.repos = data?.repos ? new Repos(data.repos) : new Repos();
  }

  fromGitHub(data: Record<string, any>) {
    this.id = data?.login;
    this.avatarURL = data?.avatar_url;
    this.name = data?.name;
    this.description = data?.description;
    this.email = data?.email;
    this.blog = data?.blog;
    this.reposURL = data?.repos_url;
  }

  fromDB(data: Record<string, any>) {
    this.company = data?.company;
    this.avatarURL = data?.avatar_url;
  }

  setRepos(data: Array<Record<string, any>>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toObject());
  }
}

export default Organization;
