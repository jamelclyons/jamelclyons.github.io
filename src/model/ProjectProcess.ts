import ProjectDesign from './ProjectDesign';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';

class ProjectProcess {
  status: string = '';
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;

  constructor(data: Record<string, any> = {}) {
    this.status = data?.status;
    this.design = data?.design || [];
    this.development = data?.development || [];
    this.delivery = data?.delivery || [];
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
