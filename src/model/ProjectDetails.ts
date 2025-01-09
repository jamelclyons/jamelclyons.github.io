import { Privacy, privacyFromString } from './enum/Enums';
import Model from './Model';
import User from './User';

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

    this.privacy = data?.privacy
      ? privacyFromString(data?.privacy)
      : Privacy.Private;
    this.clientID = data?.client_id || '0';
    this.clientName = data?.client_name || 'J.C. LYONS ENTERPRISES LLC';
    this.startDate = data?.start_date || '06/16/2010';
    this.endDate = data?.end_date || 'Active Development';
    this.content = data?.content || '';
    this.teamList = data?.team_list || [];
  }
}

export default ProjectDetails;
