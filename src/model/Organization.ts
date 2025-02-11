import Model from './Model';
import ContactMethods from './ContactMethods';
import Repos from './Repos';

import user from '../../user.json';

import GitHubRepoQuery from './GitHubRepoQuery';

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
    this.github = data?.github;
    this.contactMethods = new ContactMethods(data?.contact_methods);
    this.contactMethods.setContactEmail(this.email);
    this.contactMethods.setContactWebsite(this.blog);
    this.reposURL = data?.repos_url;
    this.repos = data?.repos ? new Repos(data.repos) : new Repos();
    this.repoQueries = data?.repo_queries;
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

  getRepoQueries() {
    if (
      Array.isArray(this.repos.collection) &&
      this.repos.collection.length > 0
    ) {
      let repoQueries: Array<GitHubRepoQuery> = [];

      this.repos.collection.forEach((repo) => {
        const repoQuery = new GitHubRepoQuery(repo.owner.login, repo.id);

        repoQueries.push(repoQuery);
      });

      return repoQueries;
    }

    return [];
  }

  setRepoQueries(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      let repoQueries: Array<GitHubRepoQuery> = [];

      data.forEach((repo) => {
        const repoQuery = new GitHubRepoQuery(repo.owner.login, repo.id);

        repoQueries.push(repoQuery);
      });

      return repoQueries;
    }

    return [];
  }
}

export default Organization;
