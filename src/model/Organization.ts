import Model from './Model';
import ContactMethods from './ContactMethods';

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

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
    this.login = data?.login;
    this.avatarURL = data?.avatar_url;
    this.description = data?.description;
    this.name = data?.name;
    this.company = data?.company;
    this.blog = data?.blog ? data.blog : '';
    this.location = data?.location;
    this.email = data?.email;
    this.url = data?.url;
    this.github = data?.html_url || data?.github;
    
    const x = data?.twitter_username
      ? `https://www.x.com/${data.twitter_username}`
      : '';

    const methods: Record<string, any> = {
      website: this.blog,
      email: this.email,
      github: data?.html_url || data?.github,
      x: x,
    };

    this.contactMethods = new ContactMethods(methods);
  }
}

export default Organization;
