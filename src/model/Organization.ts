import Model from './Model';
import ContactMethods, { ContactMethodsObject } from './ContactMethods';
import Repos from './Repos';

import * as organization from '../../organization.json';

import GitHubRepoQuery, { GitHubRepoQueryObject } from './GitHubRepoQuery';
import { RepoObject } from './Repo';

export type OrganizationObject = {
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  avatar_url: string | null;
  login: string | null;
  description: string | null;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  url: string | null;
  github: string | null;
  contactMethods: ContactMethodsObject | null;
  reposURL: string | null;
  repos: Array<RepoObject> | null;
  repoQueries: Array<GitHubRepoQueryObject> | null;
};

class Organization extends Model {
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  avatarURL: string | null;
  login: string | null;
  description: string | null;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  url: string | null;
  github: string | null;
  contactMethods: ContactMethods | null;
  reposURL: string | null;
  repos: Repos | null;
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
    this.contactMethods = data?.contact_methods
      ? new ContactMethods(data?.contact_methods)
      : null;
    this.contactMethods
      ? this.contactMethods.setContactEmail({ value: this.email })
      : null;
    this.contactMethods
      ? this.contactMethods.setContactWebsite({ url: this.blog })
      : null;
    this.reposURL = repos_url ?? data?.repos_url;
    this.repos = data?.repos ? new Repos(data.repos) : new Repos();
    this.repoQueries = this.setRepoQueries(data?.repo_queries);
  }

  getRepos(data: Array<Record<string, any>>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => {
      return {
        ...repo.toObject(),
        skills: repo.skills ? repo.skills.toObject() : null,
        contents: {
          solution:
            repo.contents && repo.contents.solution
              ? repo.contents.solution.toObject()
              : null,
          design:
            repo.contents && repo.contents.design
              ? repo.contents.design?.toObject()
              : null,
          development:
            repo.contents && repo.contents.development
              ? repo.contents.development.toObject()
              : null,
          delivery:
            repo.contents && repo.contents.delivery
              ? repo.contents.delivery.toObject()
              : null,
          problem:
            repo.contents && repo.contents.problem
              ? repo.contents.problem.toObject()
              : null,
        },
        contributors: {
          users:
            repo.contributors &&
            Array.isArray(repo.contributors.users) &&
            repo.contributors.users.length > 0
              ? repo.contributors.users.map((user) => user.toObject())
              : null,
        },
      };
    });
  }

  setReposFromGitHub(data: Array<Record<string, any>>) {
    const repos = new Repos();
    repos.fromGitHub(data);
    this.repos = repos;
  }

  getReposFromGitHub(data: Array<Record<string, any>>) {
    const repos = new Repos();
    repos.fromGitHub(data);
    return repos.collection.map((repo) => {
      return {
        ...repo.toObject(),
        skills: repo.skills ? repo.skills.toObject() : null,
        contents: {
          solution:
            repo.contents && repo.contents.solution
              ? repo.contents.solution.toObject()
              : null,
          design:
            repo.contents && repo.contents.design
              ? repo.contents.design.toObject()
              : null,
          development:
            repo.contents && repo.contents.development
              ? repo.contents.development.toObject()
              : null,
          delivery:
            repo.contents && repo.contents.delivery
              ? repo.contents.delivery.toObject()
              : null,
          problem:
            repo.contents && repo.contents.problem
              ? repo.contents.problem.toObject()
              : null,
        },
        contributors: {
          users:
            repo.contributors &&
            Array.isArray(repo.contributors.users) &&
            repo.contributors.users.length > 0
              ? repo.contributors.users.map((user) => user.toObject())
              : null,
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

  toOrganizationObject(): OrganizationObject {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      avatar_url: this.avatarURL,
      login: this.login,
      description: this.description,
      name: this.name,
      company: this.company,
      blog: this.blog,
      location: this.location,
      email: this.email,
      url: this.url,
      github: this.github,
      contactMethods: this.contactMethods
        ? this.contactMethods.toContactMethodsObject()
        : null,
      reposURL: this.reposURL,
      repos: this.repos
        ? this.repos.collection.map((repo) => repo.toRepoObject())
        : null,
      repoQueries: this.repoQueries
        ? this.repoQueries.map((repoQuery) =>
            repoQuery.toGitHubRepoQueryObject()
          )
        : null,
    };
  }
}

export default Organization;
