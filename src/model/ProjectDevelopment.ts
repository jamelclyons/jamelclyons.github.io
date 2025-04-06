import Model from './Model';
import Task from './Task';
import ProjectVersions, { ProjectVersionsObject } from './ProjectVersions';
import ProjectSkills, { ProjectSkillsDataObject } from './ProjectSkills';

import { ProjectSkillsObject } from './ProjectSkills';
import Gallery, { GalleryObject } from './Gallery';
import CheckList, { CheckListObject } from './CheckList';
import ContentURL from './ContentURL';
import RepoURL from './RepoURL';

export type ProjectDevelopmentObject = {
  gallery: GalleryObject | null;
  repo_url: string | null;
  content_url: string | null;
  skills: ProjectSkillsObject | null;
  check_list: CheckListObject | null;
  versions_list: ProjectVersionsObject | null;
};

export type ProjectDevelopmentDataObject = {
  gallery: GalleryObject | null;
  repo_url: string | null;
  content_url: string | null;
  skills: ProjectSkillsDataObject | null;
  check_list: CheckListObject | null;
  versions_list: ProjectVersionsObject | null;
};

class ProjectDevelopment extends Model {
  gallery: Gallery | null;
  repoURL: RepoURL | null;
  contentURL: ContentURL | null;
  skills: ProjectSkills | null;
  checkList: CheckList | null;
  versionsList: ProjectVersions | null;

  constructor(data: Record<string, any> | ProjectDevelopmentObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.repoURL = data?.repo_url ? new RepoURL(data.repo_url) : null;
    this.contentURL = data?.content_url?.url
      ? new ContentURL(data.content_url.url)
      : null;
    this.skills = data?.skills ? new ProjectSkills(data.skills) : null;
    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : null;
  }

  toArrayTask(data: Array<Record<string, any>>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }
  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setSkills(skills: ProjectSkills) {
    this.skills = skills;
  }

  toProjectDevelopmentObject(): ProjectDevelopmentObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      repo_url: this.repoURL ? this.repoURL.url : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      skills: this.skills ? this.skills.toProjectSkillsObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      versions_list: this.versionsList
        ? this.versionsList.toProjectVersionsObject()
        : null,
    };
  }

  toProjectDevelopmentDataObject(): ProjectDevelopmentDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      repo_url: this.repoURL ? this.repoURL.url : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      skills: this.skills ? this.skills.toProjectSkillsDataObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      versions_list: this.versionsList
        ? this.versionsList.toProjectVersionsObject()
        : null,
    };
  }
}

export default ProjectDevelopment;
