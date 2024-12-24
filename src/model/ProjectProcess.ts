import ProjectDesign from './ProjectDesign';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';

class ProjectProcess {
  status: string = '';
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;

  constructor(
    status: string,
    design: ProjectDesign,
    development: ProjectDevelopment,
    delivery: ProjectDelivery
  ) {
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
