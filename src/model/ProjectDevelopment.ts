import Model from './Model';
import Task, { TaskObject } from './Task';
import ProjectVersions, { ProjectVersionsObject } from './ProjectVersions';
import ProjectSkills from './ProjectSkills';

import { ProjectSkillsObject } from './ProjectSkills';

export type ProjectDevelopmentObject = {
  repo_url: string;
  content_url: string;
  skills: ProjectSkillsObject;
  check_list: Array<TaskObject>;
  versions_list: ProjectVersionsObject;
};

class ProjectDevelopment extends Model {
  repoURL: string;
  contentURL: string;
  skills: ProjectSkills;
  checkList: Array<TaskObject>;
  versionsList: ProjectVersions;

  constructor(data: Record<string, any> | ProjectDevelopmentObject = {}) {
    super();

    this.repoURL = data?.repo_url || '';
    this.contentURL = data?.content_url || '';
    this.skills = data?.skills
      ? new ProjectSkills(data.skills)
      : new ProjectSkills();
    this.checkList = data?.check_list ? this.toArrayTask(data.check_list) : [];
    this.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : new ProjectVersions();
  }

  toArrayTask(data: Array<Record<string, any>>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }

  setSkills(skills: ProjectSkills) {
    console.log(skills)
    this.skills = skills;
  }
}

export default ProjectDevelopment;
