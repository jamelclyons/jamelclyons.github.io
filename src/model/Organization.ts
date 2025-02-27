import Model from './Model';
import ContactMethods from './ContactMethods';
import Repos from './Repos';

import * as organization from '../../organization.json';

import GitHubRepoQuery from './GitHubRepoQuery';

export interface OrganizationObject extends Model {
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
  contactMethods: ContactMethods;
  reposURL: string;
  repos: Repos;
  repoQueries: Array<GitHubRepoQuery>;
}

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
  contactMethods: ContactMethods;
  reposURL: string;
  repos: Repos;
  repoQueries: Array<GitHubRepoQuery>;

  constructor(data: Record<string, any> = {}) {
    super();

    const { name, company, founded_on, location, website, contact, repos_url } =
      organization;

    this.id = data?.id;
    this.createdAt = founded_on ?? data?.created_at;
    this.updatedAt = data?.updated_at;
    this.login = data?.login;
    this.avatarURL = data?.avatar_url;
    this.description = data?.description;
    this.name = name ?? data?.name;
    this.company = company ?? data?.company;
    this.blog = data?.blog ? data.blog : website;
    this.location = location ?? data?.location;
    this.email = contact.email.value ?? data?.email;
    this.url = data?.url;
    this.github = data?.github;
    this.contactMethods = contact ? new ContactMethods(contact) : new ContactMethods(data?.contact_methods);
    this.contactMethods.setContactEmail({ value: this.email });
    this.contactMethods.setContactWebsite({ url: this.blog });
    this.reposURL = repos_url ?? data?.repos_url;
    this.repos = data?.repos ? new Repos(data.repos) : new Repos();
    this.repoQueries = this.setRepoQueries(data?.repo_queries);
  }

  getRepos(data: Array<Record<string, any>>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => {
      return {
        ...repo.toObject(),
        skills: repo.skills.toObject(),
        contents: {
          solution: repo.contents.solution?.toObject() || null,
          design: repo.contents.design?.toObject() || null,
          development: repo.contents.development?.toObject() || null,
          delivery: repo.contents.delivery?.toObject() || null,
          problem: repo.contents.problem?.toObject() || null,
        },
        contributors: {
          users: repo.contributors.users.map((user) => user.toObject()),
        },
      };
    });
  }

  getReposFromGitHub(data: Array<Record<string, any>>) {
    const repos = new Repos();
    repos.fromGitHub(data);
    return repos.collection.map((repo) => {
      return {
        ...repo.toObject(),
        skills: repo.skills.toObject(),
        contents: {
          solution: repo.contents.solution?.toObject() || null,
          design: repo.contents.design?.toObject() || null,
          development: repo.contents.development?.toObject() || null,
          delivery: repo.contents.delivery?.toObject() || null,
          problem: repo.contents.problem?.toObject() || null,
        },
        contributors: {
          users: repo.contributors.users.map((user) => user.toObject()),
        },
      };
    });
  }

  fromGitHub(data: Record<string, any>) {
    this.id = data?.login;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
    this.login = data?.login;
    this.avatarURL = data?.avatar_url;
    this.name = data?.name;
    this.company = data?.company;
    this.description = data?.description;
    this.email = data?.email;
    this.blog = data?.blog;
    this.location = data?.location;
    this.reposURL = data?.repos_url;
    this.url = data?.url;
    this.github = data?.github;
  }

  fromDB(data: Record<string, any>) {
    this.company = data?.company;
    this.avatarURL = data?.avatar_url;
  }

  getRepoQueries(data: Array<Record<string, any>>) {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        const repoQuery = new GitHubRepoQuery(query.owner.login, query.id);
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
}

export default Organization;
