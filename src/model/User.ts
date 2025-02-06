import Model from './Model';
import Image from './Image';
import ContactMethods from './ContactMethods';

import Organizations from '@/model/Organizations';
import Repos from '@/model/Repos';

import user from '../../user.json';

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
  images: Record<string, Image>;
  organizationsURL: string;
  organizations: Organizations = new Organizations();
  reposURL: string;
  repos: Repos = new Repos();

  constructor(data: Record<string, any> = {}) {
    super();

    const { name, title, website, contact, resume } = user;

    const { hacker_rank, gitHub, instagram, linkedIn, x, email, phone } =
      contact;

    this.id = data?.id;
    this.login = data?.login;
    this.avatarURL = data?.avatar_url || '';
    this.name = data?.name || name;
    this.title = data?.title || title;
    this.bio = data?.bio;
    this.email = data?.email || email;
    this.phone = data?.phone || phone;
    this.resume = data?.resume || resume;
    this.website = data?.website || website;
    this.contactMethods = new ContactMethods(data?.contact_methods);
    this.images = data?.images || '';
    this.organizationsURL = data?.organizations_url;
    this.organizations = data?.organizations
      ? new Organizations(data.organizations)
      : new Organizations();
    this.reposURL = data?.repos_url;
    this.repos = data?.repos ? new Repos(data.repos) : new Repos();
  }

  setRepos(data: Array<Record<string, any>>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toObject());
  }

  setOrganizations(organizations: Array<Record<string, any>>) {
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
}

export default User;
