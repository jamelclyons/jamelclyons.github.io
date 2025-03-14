import Model from './Model';
import ProjectDesign, { ProjectDesignDataObject, ProjectDesignObject } from './ProjectDesign';
import ProjectDevelopment, {
  ProjectDevelopmentDataObject,
  ProjectDevelopmentObject,
} from './ProjectDevelopment';
import ProjectDelivery, { ProjectDeliveryDataObject, ProjectDeliveryObject } from './ProjectDelivery';
import ProjectStatus, { ProjectStatusDataObject, ProjectStatusObject } from './ProjectStatus';

export type ProjectProcessObject = {
  status: ProjectStatusObject;
  design: ProjectDesignObject;
  development: ProjectDevelopmentObject;
  delivery: ProjectDeliveryObject;
};

export type ProjectProcessDataObject = {
  status: ProjectStatusDataObject;
  design: ProjectDesignDataObject;
  development: ProjectDevelopmentDataObject;
  delivery: ProjectDeliveryDataObject;
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

  toProjectProcessDataObject(): ProjectProcessDataObject {
    return {
      status: this.status.toProjectStatusDataObject(),
      design: this.design.toProjectDesignDataObject(),
      development: this.development.toProjectDevelopmentDataObject(),
      delivery: this.delivery.toProjectDeliveryDataObject(),
    };
  }
}

export default ProjectProcess;
