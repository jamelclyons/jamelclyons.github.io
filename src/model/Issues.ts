import Issue, { IssueObject, IssuesGQL } from './Issue';

export interface IssuesObject {
  list: Array<IssueObject> | null;
}

class Issues {
  list: Array<Issue>;

  constructor(data?: Array<IssueObject> | Array<Record<string, any>>) {
    this.list =
      data && Array.isArray(data) ? data.map((issue) => new Issue(issue)) : [];
  }

  fromGitHubGraphQL(issues: Array<IssuesGQL>) {
    let list: Array<Issue> = [];

    if (Array.isArray(issues) && issues.length > 0) {
      issues.forEach((issue) => {
        const issueClass = new Issue();
        issueClass.fromGitHubGraphQL(issue);
        list.push(issueClass);
      });
    }

    this.list = list;
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
