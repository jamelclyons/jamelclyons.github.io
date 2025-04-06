import Model from './Model';
import User, { UserObject } from './User';

import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectDetailsObject = {
  privacy: string | null;
  client_id: string | null;
  content: ContentURLObject | null;
  team_list: Array<UserObject> | null;
};

export type ProjectDetailsDataObject = {
  privacy: string | null;
  client_id: string | null;
  content: string | null;
  team_list: Array<string> | null;
};

class ProjectDetails extends Model {
  privacy: string | null;
  clientID: string | null;
  content: ContentURL | null;
  teamList: Array<User> | null;

  constructor(data: Record<string, any> | ProjectDetailsObject = {}) {
    super();

    this.privacy = data?.privacy ? data.privacy : 'private';
    this.clientID = data?.client_id ? data.client_id : '0';
    this.content = data?.content?.url ? new ContentURL(data.content.url) : null;
    this.teamList = data?.team_list ? this.getTeamList(data.team_list) : null;
  }

  setClientID(id: string | null) {
    this.clientID = id;
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
      team_list: this.teamList
        ? this.teamList.map((user) => user.toUserObject())
        : null,
    };
  }

  toDetailsDataObject(): ProjectDetailsDataObject {
    return {
      privacy: this.privacy,
      client_id: this.clientID,
      content: this.content?.url ? this.content.url : null,
      team_list: this.teamList ? this.teamList.map((user) => user.id) : null,
    };
  }
}

export default ProjectDetails;
