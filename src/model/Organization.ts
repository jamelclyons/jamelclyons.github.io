import Model from './Model';

class Organization extends Model {
  id: string;
  createdAt: string;
  updatedAt: string;
  avatarURL: string;
  description: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  url: string;

  constructor(data: Record<string, any> = {}) {
    super();

    this.id = data?.id;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
    this.avatarURL = data?.avatar_url;
    this.description = data?.description;
    this.name = data?.name;
    this.company = data?.company;
    this.blog = data?.blog;
    this.location = data?.location;
    this.email = data?.email;
    this.url = data?.url;
  }
}

export default Organization;
