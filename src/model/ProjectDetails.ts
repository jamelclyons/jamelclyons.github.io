import { Privacy, privacyFromString } from './enum/Enums';

import Model from './Model';
import User from './User';
import packageJson from '../../package.json';

class ProjectDetails extends Model {
  privacy: Privacy = Privacy.Private;
  clientID: string;
  clientName: string;
  startDate: string;
  endDate: string;
  content: string;
  teamList: Array<User>;

  constructor(data?: Record<string, any>) {
    super();

    const { author} = packageJson;

    this.privacy = data?.privacy
      ? privacyFromString(data?.privacy)
      : Privacy.Private;
    this.clientID = data?.client_id || '0';
    this.clientName = data?.client_name || author.company.name;
    this.startDate = data?.start_date || author.company.founded_on;
    this.endDate = data?.end_date || 'Active Development';
    this.content = data?.content || '';
    this.teamList = data?.team_list || [];
  }
}

export default ProjectDetails;
