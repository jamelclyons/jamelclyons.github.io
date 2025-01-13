import Model from './Model';

class Owner extends Model {
  id: string;
  type: string;
  login: string;
  name: string;
  company: string;
  email: string;
  avatarURL: string;
  url: string;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id;
    this.type = data?.type;
    this.login = data?.login;
    this.name = data?.name;
    this.company = data?.company;
    this.email = data?.email;
    this.avatarURL = data?.avatar_url;
    this.url = data?.url;
  }
}

export default Owner;
