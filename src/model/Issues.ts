import Issue, { IssueObject } from './Issue';

export interface IssuesObject {
  list: Array<IssueObject> | null;
}

class Issues {
  list: Array<Issue>;

  constructor(data: Array<IssueObject> | Array<Record<string, any>>) {
    this.list =
      data && Array.isArray(data) ? data.map((issue) => new Issue(issue)) : [];
  }

  toIssuesObject(): IssuesObject {
    return {
      list:
        this.list.length > 0
          ? this.list.map((issue) => issue.toIssueObject())
          : [],
    };
  }
}

export default Issues;
