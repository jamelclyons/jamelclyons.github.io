import Model from './Model';
import User, { UserObject } from './User';
import * as UserJSON from '../../user.json';

import { formatTime } from '@/utilities/String';
import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectDetailsObject = {
  privacy: string;
  client_id: string;
  client_name: string;
  start_date: string;
  end_date: string;
  content: ContentURLObject | null;
  team_list: Array<UserObject>;
};

class ProjectDetails extends Model {
  privacy: string;
  clientID: string;
  clientName: string;
  startDate: string | null;
  endDate: string | null;
  content: ContentURL;
  teamList: Array<User>;

  constructor(data: Record<string, any> | ProjectDetailsObject = {}) {
    super();

    this.privacy = data?.privacy ? data.privacy : 'private';
    this.clientID = data?.client_id ? data.client_id : '0';
    this.clientName = data?.client_name ? data.client_name : UserJSON.name;
    this.startDate = data?.start_date ? formatTime(data.start_date) : null;
    this.endDate = data?.end_date ? formatTime(data.end_date) : null;
    this.content = data?.content ? data.content : null;
    this.teamList = data?.team_list ? this.getTeamList(data.team_list) : [];
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
      client_name: this.clientName,
      start_date: this.startDate ?? '',
      end_date: this.endDate ?? '',
      content: this.content ? this.content?.toContentURLObject() : null,
      team_list: this.teamList.map((user) => user.toUserObject()),
    };
  }
}

export default ProjectDetails;
