import CheckList, { CheckListObject } from './CheckList';
import Model from './Model';

export type ProjectCheckListObject = {
  design_check_list: CheckListObject;
  development_check_list: CheckListObject;
  delivery_check_list: CheckListObject;
};

class ProjectCheckList extends Model {
  designCheckList: CheckList;
  developmentCheckList: CheckList;
  deliveryCheckList: CheckList;
  totalWeight: number;

  constructor(data?: ProjectCheckListObject) {
    super();

    this.designCheckList = new CheckList(data?.design_check_list);
    this.developmentCheckList = new CheckList(data?.development_check_list);
    this.deliveryCheckList = new CheckList(data?.delivery_check_list);
    this.totalWeight = this.getTotalWeight();
  }

  getTotalWeight(): number {
    return (
      this.designCheckList.totalWeight +
      this.developmentCheckList.totalWeight +
      this.deliveryCheckList.totalWeight
    );
  }

  toProjectCheckListObject(): ProjectCheckListObject {
    return {
      design_check_list: this.designCheckList.toCheckListObject(),
      development_check_list: this.designCheckList.toCheckListObject(),
      delivery_check_list: this.designCheckList.toCheckListObject(),
    };
  }
}

export default ProjectCheckList;
