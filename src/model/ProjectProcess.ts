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

  constructor(
    status: ProjectStatus = new ProjectStatus,
    design: ProjectDesign = new ProjectDesign,
    development: ProjectDevelopment = new ProjectDevelopment,
    delivery: ProjectDelivery = new ProjectDelivery
  ) {
    super();
    
    this.status = status;
    this.design = design;
    this.development = development;
    this.delivery = delivery;
  }

  toObject(): Record<string, any> {
    return {
      status: this.status,
      design: this.design.toObject(),
      development: this.development.toObject(),
      delivery: this.delivery.toObject(),
    };
  }
}

export default ProjectProcess;
