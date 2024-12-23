import SocialAccount from './SocialAccount';

class User {
  id: string;
  avatarURL: string;
  name: string;
  title: string;
  bio: string;
  resume: string;
  website: string;
  githubUsername: string;
  organizations: Array<string>;
  repos: Array<string>;
  email: string;
  socialAccounts: Array<SocialAccount>;

  constructor(data: Record<string, any> = {}) {
    this.id = data?.id || '';
    this.avatarURL = data?.avatar_url || '';
    this.name = data?.name || '';
    this.title = data?.title || '';
    this.bio = data?.bio || '';
    this.resume = data?.resume || '';
    this.website = data?.website || '';
    this.githubUsername = data?.github_username || '';
    this.organizations = data?.organizations || '';
    this.repos = data?.repos || '';
    this.email = data?.email || '';
    this.socialAccounts = data?.social_accounts || '';
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      avatar_url: this.avatarURL,
      name: this.name,
      title: this.title,
      bio: this.bio,
      resume: this.resume,
      website: this.website,
      github_username: this.githubUsername,
      organizations: this.organizations,
      repos: this.repos,
      email: this.email,
      social_accounts: this.socialAccounts,
    };
  }
}

export default User;
