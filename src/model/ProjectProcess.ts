import Model from './Model';
import ProjectDesign, { ProjectDesignObject } from './ProjectDesign';
import ProjectDevelopment, {
  ProjectDevelopmentObject,
} from './ProjectDevelopment';
import ProjectDelivery, { ProjectDeliveryObject } from './ProjectDelivery';
import ProjectStatus, { ProjectStatusObject } from './ProjectStatus';

export type ProjectProcessObject = {
  status: ProjectStatusObject;
  design: ProjectDesignObject;
  development: ProjectDevelopmentObject;
  delivery: ProjectDeliveryObject;
};

class ProjectProcess extends Model {
  status: ProjectStatus;
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;

  constructor(data: Record<string, any> | ProjectProcessObject = {}) {
    super();

    this.status = new ProjectStatus(data?.status);
    this.design = new ProjectDesign(data?.design);
    this.development = new ProjectDevelopment(data?.development);
    this.delivery = new ProjectDelivery(data?.delivery);
  }

  toProjectProcessObject(): ProjectProcessObject {
    return {
      status: this.status.toProjectStatusObject(),
      design: this.design.toProjectDesignObject(),
      development: this.development.toProjectDevelopmentObject(),
      delivery: this.delivery.toProjectDeliveryObject(),
    };
  }
}

export default ProjectProcess;
