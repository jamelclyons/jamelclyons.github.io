import Model from './Model';
import Image from './Image';
import ContactMethods from './ContactMethods';

import Organizations from '@/model/Organizations';
import Repos from '@/model/Repos';

import user from '../../user.json';

class User extends Model {
  id: string;
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
    this.avatarURL = data?.avatar_url || '';
    this.name = data?.name || name;
    this.title = data?.title || title;
    this.bio = data?.bio;
    this.email = data?.email || email;
    this.phone = data?.phone || phone;
    this.resume = data?.resume || resume;
    this.website = data?.website || website;
    this.contactMethods = new ContactMethods(
      hacker_rank,
      linkedIn,
      x,
      instagram,
      gitHub,
      website,
      email,
      phone
    );
    this.images = data?.images || '';
    this.organizationsURL = data?.organizations_url;
    this.organizations = data?.organizations
      ? new Organizations(data.organizations)
      : new Organizations();
    this.reposURL = data?.repos_url;
    this.repos = data?.repos
      ? new Repos(data?.repos)
      : new Repos();
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
  }

  setRepos(data: Array<Record<string, any>>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toObject());
  }

  setOrganizations(organizations: Array<Record<string, any>>) {
    const orgs = new Organizations(organizations);
    return orgs.list.map((org) => org.toObject());
  }

  setContactMethods(data: Array<Record<string, any>>) {
    let hackerrank = this.contactMethods.hackerrank.url;
    let linkedin = this.contactMethods.linkedin.url;
    let instagram = this.contactMethods.instagram.url;
    let x = this.contactMethods.x.url;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((contact) => {
        const url = new URL(contact.url);

        if (url.host === 'www.hackerrank.com') {
          hackerrank = url.href;
        }

        if (url.host === 'www.linkedin.com') {
          linkedin = url.href;
        }

        if (url.host === 'x.com') {
          x = url.href;
        }

        if (url.host === 'www.instagram.com') {
          instagram = url.href;
        }
      });
    }

    this.contactMethods = new ContactMethods(
      hackerrank,
      linkedin,
      x,
      instagram,
      this.contactMethods.github.url,
      this.website,
      this.email,
      this.phone
    );
  }

  fromDB(data: Record<string, any>) {
    this.title = data?.title || this.title;

    const resume = new URL(data?.resume);
    this.resume = resume ? resume.href : this.resume;

    this.images = data?.images || '';
  }
}

export default User;
