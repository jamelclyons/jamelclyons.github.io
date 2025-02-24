import Model from './Model';
import Task, { TaskObject } from './Task';
import ProjectVersions, { ProjectVersionsObject } from './ProjectVersions';
import Skills from './Skills';
import { SkillsObject } from '@/controllers/taxonomiesSlice';

export type ProjectDevelopmentObject = {
  repo_url: string;
  content_url: string;
  skills: SkillsObject;
  check_list: Array<TaskObject>;
  versions_list: ProjectVersionsObject;
};

class ProjectDevelopment extends Model {
  repoURL: string;
  contentURL: string;
  skills: Skills;
  checkList: Array<TaskObject>;
  versionsList: ProjectVersions;

  constructor(data: Record<string, any> | ProjectDevelopmentObject = {}) {
    super();

    this.repoURL = data?.repo_url || '';
    this.contentURL = data?.content_url || '';
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
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
}

export default ProjectDevelopment;
