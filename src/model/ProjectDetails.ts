import Model from './Model';

class ProjectDetails extends Model {
  public: boolean = false;
  clientID: string
  clientName: string;
  startDate: string;
  endDate: string;
  detailsList: Array<string>;
  teamList: Array<string>;

  constructor(data?: Record<string, any>) {
    super();

    this.public = data?.public;
    this.clientName = data?.client_name || 'J.C. LYONS ENTERPRISES LLC';
    this.startDate = data?.start_date || '';
    this.endDate = data?.end_date || '';
    this.detailsList = data?.details_list || [];
    this.teamList = data?.team_list || [];
    this.clientID = data?.client_id || 0;
  }
}

export default ProjectDetails;
