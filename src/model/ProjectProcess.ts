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
  status: ProjectStatusObject | null;
  design: ProjectDesignObject | null;
  development: ProjectDevelopmentObject | null;
  delivery: ProjectDeliveryObject | null;
};

export type ProjectProcessDataObject = {
  status: ProjectStatusObject | null;
  design: ProjectDesignDataObject | null;
  development: ProjectDevelopmentDataObject | null;
  delivery: ProjectDeliveryDataObject | null;
};

class ProjectProcess extends Model {
  design: ProjectDesign | null;
  development: ProjectDevelopment | null;
  delivery: ProjectDelivery | null;
  status: ProjectStatus | null;
  checkList: ProjectCheckList | null;

  constructor(data: Record<string, any> | ProjectProcessObject = {}) {
    super();

    this.design = data?.design ? new ProjectDesign(data.design) : null;
    this.development = data?.development
      ? new ProjectDevelopment(data.development)
      : null;
    this.delivery = data?.delivery ? new ProjectDelivery(data.delivery) : null;

    const projectCheckListObject: ProjectCheckListObject = {
      design_check_list:
        this.design && this.design.checkList
          ? this.design.checkList.toCheckListObject()
          : null,
      development_check_list:
        this.development && this.development.checkList
          ? this.development.checkList.toCheckListObject()
          : null,
      delivery_check_list:
        this.delivery && this.delivery.checkList
          ? this.delivery.checkList.toCheckListObject()
          : null,
    };

    this.checkList =
      projectCheckListObject.design_check_list ||
      projectCheckListObject.development_check_list ||
      projectCheckListObject.delivery_check_list
        ? new ProjectCheckList(projectCheckListObject)
        : null;

    const progress = this.checkList
      ? new ProjectProgress(this.checkList)
      : null;

    this.status =
      data?.status && progress
        ? new ProjectStatus(data?.status, progress)
        : null;
  }

  toProjectProcessObject(): ProjectProcessObject {
    return {
      status: this.status ? this.status.toProjectStatusObject() : null,
      design: this.design ? this.design.toProjectDesignObject() : null,
      development: this.development
        ? this.development.toProjectDevelopmentObject()
        : null,
      delivery: this.delivery ? this.delivery.toProjectDeliveryObject() : null,
    };
  }

  toProjectProcessDataObject(): ProjectProcessDataObject {
    return {
      status: this.status ? this.status.toProjectStatusObject() : null,
      design: this.design ? this.design.toProjectDesignDataObject() : null,
      development: this.development
        ? this.development.toProjectDevelopmentDataObject()
        : null,
      delivery: this.delivery
        ? this.delivery.toProjectDeliveryDataObject()
        : null,
    };
  }
}

export default ProjectProcess;
