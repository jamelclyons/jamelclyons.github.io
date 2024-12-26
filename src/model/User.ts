import SocialAccount from './SocialAccount';
import Image from './Image';
import packageJson from '../../package.json';

import Organization from '../model/Organization';

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
  socialAccounts: Array<SocialAccount>;
  images: Record<string, Image>;

  constructor(data: Record<string, any> = {}) {
    const { homepage, author, title } = packageJson;

    this.id = this.getGitHubUsername(homepage);
    this.avatarURL = data?.avatar_url || '';
    this.name = data?.name || author;
    this.title = data?.title || title;
    this.bio = data?.bio || '';
    this.email = data?.email || '';
    this.phone = data?.phone || '';
    this.resume = data?.resume || '';
    this.website = data?.website || homepage;
    this.organizations = this.setOrganizations(data?.organizations) || [];
    this.repos = data?.repos || '';
    this.socialAccounts = this.getSocialAccounts(data?.social_accounts);
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

  getSocialAccounts(accounts: Array<Record<string, any>>) {
    if (Array.isArray(accounts) && accounts.length > 0) {
      return accounts.map(
        (account: Record<string, any>) => new SocialAccount(account)
      );
    }

    return [];
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
      social_accounts: this.socialAccounts,
      images: this.images,
    };
  }
}

export default User;
