import Model from './Model';
import Task, { TaskObject } from './Task';
import ProjectVersions, { ProjectVersionsObject } from './ProjectVersions';
import ProjectSkills from './ProjectSkills';

import { ProjectSkillsObject } from './ProjectSkills';
import Gallery, { GalleryObject } from './Gallery';
import CheckList, { CheckListObject } from './CheckList';
import ContentURL, { ContentURLObject } from './ContentURL';

export type ProjectDevelopmentObject = {
  gallery: GalleryObject;
  repo_url: string;
  content_url: ContentURLObject | null;
  skills: ProjectSkillsObject;
  check_list: CheckListObject;
  versions_list: ProjectVersionsObject;
};

class ProjectDevelopment extends Model {
  gallery: Gallery;
  repoURL: string;
  contentURL: ContentURL | null;
  skills: ProjectSkills;
  checkList: CheckList;
  versionsList: ProjectVersions;

  constructor(data: Record<string, any> | ProjectDevelopmentObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.repoURL = data?.repo_url || '';
    this.contentURL = data?.content_url?.url
    ? new ContentURL(data.content_url.url)
    : null;
    this.skills = data?.skills
      ? new ProjectSkills(data.skills)
      : new ProjectSkills();
    this.checkList = new CheckList(data?.check_list);
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
    console.log(skills);
    this.skills = skills;
  }

  toProjectDevelopmentObject(): ProjectDevelopmentObject {
    return {
      gallery: this.gallery.toGalleryObject(),
      repo_url: this.repoURL,
      content_url: this.contentURL,
      skills: this.skills.toProjectSkillsObject(),
      check_list: this.checkList.toCheckListObject(),
      versions_list: this.versionsList.toProjectVersionsObject(),
    };
  }
}

export default ProjectDevelopment;
