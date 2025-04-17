import Model from './Model';
import * as UserJSON from '../../user.json';

export interface OwnerObject {
  id: string;
  type: string;
  login: string;
  name: string;
  company: string;
  email: string;
  avatar_url: string | null;
  url: string;
  repos_url: string;
}

class Owner extends Model {
  id: string;
  type: string;
  login: string;
  name: string;
  company: string;
  email: string;
  avatarURL: string;
  url: string;
  reposURL: string;

  constructor(data: Record<string, any> | OwnerObject = {}) {
    super();

    this.id = data?.id ?? '0';
    this.type = data?.type ?? 'User';
    this.login = data?.login;
    this.name = data?.name ?? UserJSON.name;
    this.company = data?.company ?? UserJSON.company.name;
    this.email = data?.email ?? UserJSON.contact_methods.email;
    this.avatarURL = data?.avatar_url ? data.avatar_url : null;
    this.url = data?.url ?? UserJSON.website;
    this.reposURL = data?.repos_url ?? UserJSON.repos;
  }

  toOwnerObject(): OwnerObject {
    return {
      id: this.id,
      type: this.type,
      login: this.login,
      name: this.name,
      company: this.company,
      email: this.email,
      avatar_url: this.avatarURL,
      url: this.url,
      repos_url: this.reposURL,
    };
  }
}

export default Owner;
