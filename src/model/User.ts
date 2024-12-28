import SocialAccount from './Contact';
import Image from './Image';
import ContactMethods from './ContactMethods';

import Organization from '../model/Organization';

import packageJson from '../../package.json';

class User {
  id: string;
  avatarURL: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  resume: string;
  website: string;
  organizations: Array<Organization>;
  repos: Array<string>;
  contactMethods: ContactMethods;
  images: Record<string, Image>;

  constructor(data: Record<string, any> = {}) {
    const { homepage, author } = packageJson;

    this.id = this.getGitHubUsername(homepage);
    this.avatarURL = data?.avatar_url || '';
    this.name = data?.name || author.name;
    this.title = data?.title || author.title;
    this.bio = data?.bio || '';
    this.email = data?.email || author.contact.email;
    this.phone = data?.phone || '';
    this.resume = data?.resume || '';
    this.website = data?.website || homepage;
    this.organizations = this.setOrganizations(data?.organizations) || [];
    this.repos = data?.repos || '';
    this.contactMethods = new ContactMethods(data?.contact_methods);
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

  setOrganizations(organizations: Array<Record<string, any>>) {
    if (Array.isArray(organizations) && organizations.length > 0) {
      return organizations.map(
        (organization: Record<string, any>) => new Organization(organization)
      );
    }

    return [];
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      avatar_url: this.avatarURL,
      name: this.name,
      title: this.title,
      bio: this.bio,
      email: this.email,
      phone: this.phone,
      resume: this.resume,
      website: this.website,
      organizations: this.organizations,
      repos: this.repos,
      contact_methods: this.contactMethods,
      images: this.images,
    };
  }
}

export default User;
