import { Privacy, privacyFromString } from './enum/Enums';

import Model from './Model';
import User from './User';
import packageJson from '../../package.json';

class ProjectDetails extends Model {
  privacy: Privacy;
  clientID: string;
  clientName: string;
  startDate: string;
  endDate: string;
  content: string;
  teamList: Array<User>;

  constructor(data?: Record<string, any>) {
    super();

    this.privacy = data?.privacy
      ? privacyFromString(data?.privacy)
      : Privacy.Public;
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
