import Model from './Model';

class ProjectDetails extends Model {
  clientName: string;
  startDate: string;
  endDate: string;
  detailsList: Array<string> = [];
  teamList: Array<string> = [];
  clientID: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    super();

    this.clientName = data?.clientName || '';
    this.startDate = data?.startDate || '';
    this.endDate = data?.endDate || '';
    this.detailsList = data?.details_list || [];
    this.teamList = data?.team_list || [];
    this.clientID = data?.client_id || [];
  }

  isEmpty() {
    if (
      this.clientName == '' &&
      this.startDate == '' &&
      this.endDate == '' &&
      this.detailsList.length == 0 &&
      this.teamList.length == 0 &&
      this.clientID.length == 0
    ) {
      return true;
    }

    return false;
  }
}

export default ProjectDetails;
