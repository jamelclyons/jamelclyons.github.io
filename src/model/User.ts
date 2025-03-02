import Model from './Model';
import Image, { ImageObject } from './Image';
import ContactMethods, { ContactMethodsObject } from './ContactMethods';

import Organizations from '@/model/Organizations';
import Repos from '@/model/Repos';

import GitHubRepoQuery from './GitHubRepoQuery';
import { RepoObject } from './Repo';
import { OrganizationObject } from './Organization';

import user from '../../user.json';

export interface UserObject {
  id: string;
  login: string;
  avatar_url: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  resume: string;
  website: string;
  contact_methods: ContactMethodsObject;
  images: Array<ImageObject>;
  organizations_url: string;
  organizations: Array<OrganizationObject>;
  repos_url: string;
  repos: Array<RepoObject>;
  repo_queries: Array<GitHubRepoQuery>;
}

class User extends Model {
  id: string;
  login: string;
  avatarURL: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  resume: string;
  website: string;
  contactMethods: ContactMethods;
  images: Array<Image>;
  organizationsURL: string;
  organizations: Organizations = new Organizations();
  reposURL: string;
  repos: Repos = new Repos();
  repoQueries: Array<GitHubRepoQuery>;

  constructor(data: Record<string, any> = {}) {
    super();

    const { name, title, website, contact, resume, avatar_url } = user;

    this.id = data?.id;
    this.login = data?.login;
    this.avatarURL = data?.avatar_url || avatar_url;
    this.name = data?.name || name;
    this.title = data?.title || title;
    this.bio = data?.bio;
    this.email = data?.email || contact.email;
    this.phone = data?.phone || contact.phone;
    this.resume = data?.resume || resume;
    this.website = data?.website || website;
    this.contactMethods = contact
      ? new ContactMethods(contact)
      : new ContactMethods(data.contact_methods);
    this.images = data?.images || '';
    this.organizationsURL = data?.organizations_url;
    this.organizations = data?.organizations
      ? new Organizations(data.organizations)
      : new Organizations();
    this.reposURL = data?.repos_url;
    this.repos = data?.repos ? new Repos(data.repos) : new Repos();
    this.repoQueries = data?.repo_queries
      ? this.setRepoQueries(data.repo_queries)
      : [];
  }

  setRepos(data: Array<Record<string, any>>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toObject());
  }

  getOrganizations(organizations: Array<Record<string, any>>) {
    const orgs = new Organizations(organizations);
    return orgs.list.map((org) => org.toObject());
  }

  fromGitHub(data: Record<string, any>) {
    this.id = data?.login;
    this.avatarURL = data?.avatar_url;
    this.name = data?.name;
    this.bio = data?.bio;
    this.email = data?.email;
    this.website = data?.blog;
    this.organizationsURL = data?.organizations_url;
    this.reposURL = data?.repos_url;
    this.login = data?.login;
  }

  fromDB(data: Record<string, any>) {
    this.title = data?.title || this.title;

    try {
      const resume = new URL(data?.resume);
      this.resume = resume ? resume.href : this.resume;
    } catch (error) {
      console.error(`Invalid URL: ${data?.resume}`, error);
    }

    this.images = data?.images || '';
  }

  getRepoQueries(data: Array<Record<string, any>>) {
    let repoQueries: Array<Record<string, any>> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        const repoQuery = new GitHubRepoQuery(
          query.owner.login,
          query.id
        ).toObject();
        repoQueries.push(repoQuery);
      });
    }

    return repoQueries;
  }

  setRepoQueries(data: Array<Record<string, any>>) {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        const repoQuery = new GitHubRepoQuery(query.owner, query.repo);
        repoQueries.push(repoQuery);
      });
    }

    return repoQueries;
  }

  toUserObject(): UserObject {
    return {
      id: this.id,
      login: this.login,
      avatar_url: this.avatarURL,
      name: this.name,
      title: this.title,
      bio: this.bio,
      email: this.email,
      phone: this.phone,
      resume: this.resume,
      website: this.website,
      contact_methods: this.contactMethods.toContactMethodsObject(),
      images: this.images.map((image) => image.toImageObject()),
      organizations_url: this.organizationsURL,
      organizations: [],
      repos_url: this.reposURL,
      repos: [],
      repo_queries: [],
    };
  }
}

export default User;
