import Model from './Model';
import * as UserJSON from '../../user.json';

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

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id ?? '0';
    this.type = data?.type ?? 'user';
    this.login = data?.login;
    this.name = data?.name ?? UserJSON.name;
    this.company = data?.company ?? UserJSON.company.name;
    this.email = data?.email ?? UserJSON.contact.email;
    this.avatarURL = data?.avatar_url ?? UserJSON.avatar_url;
    this.url = data?.url ?? UserJSON.website;
    this.reposURL = data?.repos_url ?? UserJSON.repos;
  }
}

export default Owner;
