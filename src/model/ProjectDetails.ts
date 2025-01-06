import Model from './Model';

class ProjectDetails extends Model {
  clientName: string;
  startDate: string;
  endDate: string;
  detailsList: Array<string>;
  teamList: Array<string>;
  clientID: string

  constructor(data?: Record<string, any>) {
    super();

    this.clientName = data?.client_name || '';
    this.startDate = data?.start_date || '';
    this.endDate = data?.end_date || '';
    this.detailsList = data?.details_list || [];
    this.teamList = data?.team_list || [];
    this.clientID = data?.client_id || '';
  }
}

export default ProjectDetails;
