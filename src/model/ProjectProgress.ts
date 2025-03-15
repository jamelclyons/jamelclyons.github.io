import Model from './Model';
import ProjectCheckList, { ProjectCheckListObject } from './ProjectCheckList';

export type ProjectProgressObject = {
  completion: number;
};

class ProjectProgress extends Model {
  completion: number;

  constructor(projectCheckList?: ProjectCheckList | ProjectCheckListObject) {
    super();

    this.completion =
      projectCheckList instanceof ProjectCheckList
        ? this.getCompletion(projectCheckList)
        : this.getCompletion(new ProjectCheckList(projectCheckList));
  }

  getCompletion(projectCheckList: ProjectCheckList) {
    let percentageComplete = 0;

    const totalWeight = projectCheckList.totalWeight;

    if (totalWeight > 0) {
      percentageComplete =
        ((projectCheckList.designCheckList.weight +
          projectCheckList.developmentCheckList.weight +
          projectCheckList.deliveryCheckList.weight) /
          totalWeight) *
        100;
    }

    return percentageComplete;
  }

  toProjectProgressObject(): ProjectProgressObject {
    return {
      completion: this.completion,
    };
  }
}

export default ProjectProgress;
