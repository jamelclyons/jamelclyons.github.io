import Model from './Model';
import User, { UserObject } from './User';

import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectDetailsObject = {
  privacy: string;
  client_id: string;
  content: ContentURLObject | null;
  team_list: Array<UserObject>;
};

export type ProjectDetailsDataObject = {
  privacy: string;
  client_id: string;
  content: string | null;
  team_list: Array<string>;
};

class ProjectDetails extends Model {
  privacy: string;
  clientID: string;
  content: ContentURL | null;
  teamList: Array<User>;

  constructor(data: Record<string, any> | ProjectDetailsObject = {}) {
    super();

    this.privacy = data?.privacy ? data.privacy : 'private';
    this.clientID = data?.client_id ? data.client_id : '0';
    this.content = data?.content?.url ? new ContentURL(data.content.url) : null;
    this.teamList = data?.team_list ? this.getTeamList(data.team_list) : [];
  }

  setContentURL(url: string) {
    this.content = new ContentURL(url);
  }

  getTeamList(data: Array<Record<string, any>>) {
    let teamList: Array<User> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((user) => {
        teamList.push(new User(user));
      });
    }
    return teamList;
  }

  toDetailsObject(): ProjectDetailsObject {
    return {
      privacy: this.privacy,
      client_id: this.clientID,
      content: this.content ? this.content?.toContentURLObject() : null,
      team_list: this.teamList.map((user) => user.toUserObject()),
    };
  }

  toDetailsDataObject(): ProjectDetailsDataObject {
    return {
      privacy: this.privacy,
      client_id: this.clientID,
      content: this.content?.url ? this.content.url : null,
      team_list: this.teamList.map((user) => user.id),
    };
  }
}

export default ProjectDetails;
