import Model from './Model';
import Image from './Image';
import ContactMethods from './ContactMethods';

import Organization from '../model/Organization';
import Repo from '../model/Repo';

import packageJson from '../../package.json';

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
  organizations: Array<Organization> = [];
  repos: Array<Repo>;
  contactMethods: ContactMethods;
  images: Record<string, Image>;

  constructor(data: Record<string, any> = {}) {
    super();

    const { homepage, author } = packageJson;
    const { gitHub, instagram, linkedIn, x, email, phone } =
      packageJson.author.contact;

    this.id = this.getGitHubUsername(homepage);
    this.avatarURL = data?.avatar_url || '';
    this.name = data?.name || author.name;
    this.title = data?.title || author.title;
    this.bio = data?.bio || '';
    this.email = data?.email || email;
    this.phone = data?.phone || phone;
    this.resume = data?.resume || author.resume;
    this.website = data?.website || homepage;
    this.repos = data?.repos || '';
    this.contactMethods = data?.contact_methods
      ? new ContactMethods(data?.contact_methods)
      : new ContactMethods({
          github: gitHub,
          instagram: instagram,
          linkedIn: linkedIn,
          x: x,
          email: email,
          phone: phone,
        });
    this.images = data?.images || '';
  }

  getGitHubUsername(url: string): string {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      const username = hostname.split('.')[0];

      return hostname.includes('github.io') ? username : '';
    } catch (error) {
      console.error(
        'Invalid homepage url check your package.json file:',
        error
      );
      return '';
    }
  }

  setOrganizations(organizations: Array<Organization>) {
    this.organizations = organizations;
  }
}

export default User;
