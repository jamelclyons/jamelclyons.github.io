import Model from './Model';
import ProjectDesign, {
  ProjectDesignDataObject,
  ProjectDesignObject,
} from './ProjectDesign';
import ProjectDevelopment, {
  ProjectDevelopmentDataObject,
  ProjectDevelopmentObject,
} from './ProjectDevelopment';
import ProjectDelivery, {
  ProjectDeliveryDataObject,
  ProjectDeliveryObject,
} from './ProjectDelivery';
import ProjectStatus, { ProjectStatusObject } from './ProjectStatus';
import ProjectProgress from './ProjectProgress';
import ProjectCheckList, { ProjectCheckListObject } from './ProjectCheckList';

export type ProjectProcessObject = {
  status: ProjectStatusObject;
  design: ProjectDesignObject;
  development: ProjectDevelopmentObject;
  delivery: ProjectDeliveryObject;
};

export type ProjectProcessDataObject = {
  design: ProjectDesignDataObject;
  development: ProjectDevelopmentDataObject;
  delivery: ProjectDeliveryDataObject;
};

class ProjectProcess extends Model {
  design: ProjectDesign;
  development: ProjectDevelopment;
  delivery: ProjectDelivery;
  status: ProjectStatus;
  checkList: ProjectCheckList;

  constructor(data: Record<string, any> | ProjectProcessObject = {}) {
    super();

    this.design = new ProjectDesign(data?.design);
    this.development = new ProjectDevelopment(data?.development);
    this.delivery = new ProjectDelivery(data?.delivery);

    const projectCheckListObject: ProjectCheckListObject = {
      design_check_list: this.design.checkList.toCheckListObject(),
      development_check_list: this.development.checkList.toCheckListObject(),
      delivery_check_list: this.delivery.checkList.toCheckListObject(),
    };

    this.checkList = new ProjectCheckList(projectCheckListObject);

    const progress = new ProjectProgress(this.checkList);

    this.status = new ProjectStatus(data?.status, progress);
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
      design: this.design.toProjectDesignDataObject(),
      development: this.development.toProjectDevelopmentDataObject(),
      delivery: this.delivery.toProjectDeliveryDataObject(),
    };
  }
}

export default ProjectProcess;
