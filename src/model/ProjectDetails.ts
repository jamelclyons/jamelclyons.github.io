import { Privacy, privacyFromString } from './enum/Enums';

import Model from './Model';
import User from './User';
import packageJson from '../../package.json';

export type ProjectDetailsObject = {
  privacy: string;
  client_id: string;
  client_name: string;
  start_date: string;
  end_date: string;
  content: string;
  team_list: Array<Record<string, any>>;
};

class ProjectDetails extends Model {
  privacy: string;
  clientID: string;
  clientName: string;
  startDate: string;
  endDate: string;
  content: string;
  teamList: Array<User>;

  constructor(data: Record<string, any> | ProjectDetailsObject = {}) {
    super();

    this.privacy = data?.privacy ? data.privacy : 'public';
    this.clientID = data?.client_id ? data.client_id : null;
    this.clientName = data?.client_name ? data.client_name : null;
    this.startDate = data?.start_date ? data.start_date : null;
    this.endDate = data?.end_date ? data.end_date : null;
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
}

export default ProjectDetails;
