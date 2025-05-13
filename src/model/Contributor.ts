import User from './User';

export type ContributorObject = {
  id: number;
  type: string;
  login: string;
  node_id: string;
  avatar_url: string;
  contributions: number;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  url: string;
  user_view_type: string;
};

class Contributor {
  id: string;
  type: string;
  login: string | null;
  avatarURL: string | null;

  constructor(data?: ContributorObject) {
    this.id = data?.id ? String(data.id) : String(0);
    this.type = data?.type ? data.type : 'User';
    this.login = data?.login ? data?.login : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
  }

  //   fromGitHub(data: ContributorObject): void {
  //     this.id = data?.id ? String(data.id) : String(0);
  //     this.type = data?.type ? data.type : 'User';
  //     this.login = data?.login ? data?.login : null;
  //     this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
  //   }
}

export default Contributor;
