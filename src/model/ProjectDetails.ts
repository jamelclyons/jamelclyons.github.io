class ProjectDetails {
  clientName: string;
  startDate: string;
  endDate: string;
  detailsList: Array<string> = [];
  teamList: Array<string> = [];
  clientID: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.clientName = data?.clientName || '';
    this.startDate = data?.startDate || '';
    this.endDate = data?.endDate || '';
    this.detailsList = data?.details_list || [];
    this.teamList = data?.team_list || [];
    this.clientID = data?.client_id || '';
  }

  toObject(): Record<string, any> {
    return {};
  }
}

export default ProjectDetails;
