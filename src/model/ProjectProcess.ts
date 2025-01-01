import Model from './Model';
import ProjectDesign from './ProjectDesign';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';
import ProjectStatus from './ProjectStatus';

class ProjectProcess extends Model {
  status: ProjectStatus;
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;

  constructor(data: Record<string, any> = {}) {
    super();

    this.status = new ProjectStatus(data?.status);
    this.design = new ProjectDesign(data?.design);
    this.development = new ProjectDevelopment(data?.development);
    this.delivery = new ProjectDelivery(data?.delivery);
  }
}

export default ProjectProcess;
