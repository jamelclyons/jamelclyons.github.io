import Image, { ImageObject } from '@/model/Image';
import ContactMethods, { ContactMethodsObject } from '@/model/ContactMethods';
import Organizations from '@/model/Organizations';
import Repos from '@/model/Repos';
import GitHubRepoQuery, {
  GitHubRepoQueryObject,
} from '@/model/GitHubRepoQuery';
import Repo, { RepoObject, RepositoryGQL } from '@/model/Repo';
import { OrganizationGQL, OrganizationObject } from './Organization';
import ContentURL from '@/model/ContentURL';

import user from '../../user.json';
import Account from './Account';

import { graphql } from '@octokit/graphql';

export interface UserObject {
  id: string;
  login: string;
  avatar_url: string | null;
  name: string | null;
  title: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  resume: string | null;
  website: string | null;
  contact_methods: ContactMethodsObject | null;
  images: Array<ImageObject> | null;
  organizations_url: string | null;
  organizations: Array<OrganizationObject> | null;
  repos_url: string | null;
  repos: Array<RepoObject> | null;
  repo_queries: Array<GitHubRepoQueryObject> | null;
  story: string | null;
}

export type UserGQLResponse = {
  viewer: {
    id: string;
    login: string;
    name: string;
    email: string;
    bio: string;
    avatarUrl: string;
    organizations: {
      nodes: Array<OrganizationGQL>;
    };
    repositories: {
      nodes: Array<RepositoryGQL>;
    };
  };
};

class User extends Account {
  id: string;
  login: string;
  avatarURL: string | null;
  name: string | null;
  title: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  resume: string | null;
  website: string | null;
  contactMethods: ContactMethods | null;
  images: Array<Image>;
  organizationsURL: string | null;
  organizations: Organizations | null;
  reposURL: string | null;
  repos: Repos | null;
  repoQueries: Array<GitHubRepoQuery> | null;
  story: ContentURL | null;

  constructor(data: Record<string, any> | UserObject = {}) {
    super();

    this.id = data?.id || this.getID();
    this.login = data?.login || null;
    this.avatarURL = data?.avatar_url || null;
    this.name = data?.name || null;
    this.title = data?.title || null;
    this.bio = data?.bio || null;
    this.email = data?.email || null;
    this.phone = data?.phone || null;
    this.resume = data?.resume || null;
    this.website = data?.website || null;
    this.contactMethods = data?.contact_methods
      ? new ContactMethods(data.contact_methods)
      : null;
    this.images = data?.images
      ? data.images.map((image: ImageObject) => new Image(image))
      : null;
    this.organizationsURL = data?.organizations_url;
    this.organizations = data?.organizations
      ? new Organizations(data.organizations)
      : null;
    this.reposURL = data?.repos_url;
    this.repos = data?.repos ? new Repos(data.repos) : new Repos();
    this.repoQueries = data?.repo_queries
      ? this.getRepoQueries(data.repo_queries)
      : null;
    this.story =
      data?.story && typeof data.story === 'string'
        ? new ContentURL(data?.story)
        : null;
  }

  getID() {
    const githubURL = user.contact_methods.github.url;
    const path = new URL(githubURL);
    const pathname = path.pathname.split('/');
    return pathname[1];
  }

  setName(name: string) {
    this.name = name;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setAvatarURL(url: string) {
    this.avatarURL = url;
  }

  setRepos(data: Array<Record<string, any>>) {
    this.repos = new Repos(data);
  }

  getRepos(data: Array<Record<string, any>>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toObject());
  }

  setOrganizations(organizations: Array<Record<string, any>>) {
    this.organizations = new Organizations(organizations);
  }

  getOrganizations(organizations: Array<Record<string, any>>) {
    const orgs = new Organizations(organizations);
    return orgs.list.map((org) => org.toOrganizationObject());
  }

  fromGitHubGraphQL(data: UserGQLResponse) {
    const user = data.viewer;
    this.id = user.id;
    this.avatarURL = user.avatarUrl;
    this.name = user.name;
    this.bio = user.bio;
    this.email = user.email;
    this.login = user.login;

    let organizations = null;

    if (
      Array.isArray(user.organizations.nodes) &&
      user.organizations.nodes.length > 0
    ) {
      const orgs = new Organizations();
      orgs.fromGitHubGraphQL(user.organizations.nodes);
      organizations = orgs;
    }

    this.organizations = organizations;

    let repositories = null;

    if (
      Array.isArray(user.repositories.nodes) &&
      user.repositories.nodes.length > 0
    ) {
      const repos = new Repos();
      const orgRepos =
        this.organizations?.list?.flatMap((org) =>
          Array.isArray(org.repos?.collection) ? org.repos.collection : []
        ) || [];

      repos.fromGitHubGraphQL(user.repositories.nodes);
      const totalRepos: Array<Repo> = [...orgRepos, ...repos.collection];
      repos.setCollection(totalRepos);
      repositories = repos;
    }

    this.repos = repositories;
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

    data?.html_url && this.contactMethods
      ? this.contactMethods.setContactGitHub({ url: data?.html_url })
      : (this.contactMethods = new ContactMethods());

    data?.html_url
      ? this.contactMethods.setContactGitHub({ url: data?.html_url })
      : null;

    data?.email && this.contactMethods
      ? this.contactMethods.setContactEmail({ value: data?.email })
      : (this.contactMethods = new ContactMethods());

    data?.email
      ? this.contactMethods.setContactEmail({ value: data?.email })
      : null;
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
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        repoQueries.push(new GitHubRepoQuery(query.owner?.login, query.id));
      });
    }

    return repoQueries;
  }

  setRepoQueries(repos: Array<RepoObject>) {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (repos.length > 0) {
      repos.forEach((repo) => {
        const repoQuery =
          repo?.owner?.login && repo?.id
            ? new GitHubRepoQuery(repo?.owner?.login, repo?.id)
            : null;

        if (repoQuery) {
          repoQueries.push(repoQuery);
        }
      });
    }

    this.repoQueries = repoQueries;
  }

  setStory(url: string) {
    this.story = new ContentURL(url);
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
      contact_methods: this.contactMethods
        ? this.contactMethods.toContactMethodsObject()
        : null,
      images:
        this.images && this.images.length > 0
          ? this.images.map((image) => image.toImageObject())
          : null,
      organizations_url: this.organizationsURL,
      organizations:
        this.organizations && this.organizations.list.length > 0
          ? this.organizations.list.map((org) => org.toOrganizationObject())
          : null,
      repos_url: this.reposURL,
      repos:
        this.repos && this.repos.collection.length > 0
          ? this.repos.collection.map((repo) => repo.toRepoObject())
          : null,
      repo_queries:
        this.repoQueries && this.repoQueries.length > 0
          ? this.repoQueries
              .filter((repoQuery) => repoQuery.owner && repoQuery.repo)
              .map((repoQuery) => repoQuery.toGitHubRepoQueryObject())
          : null,
      story: this.story ? this.story.url : null,
    };
  }
}

export default User;
