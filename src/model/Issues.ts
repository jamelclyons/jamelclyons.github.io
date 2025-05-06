import Issue, { IssueObject, IssueGQL } from './Issue';

export interface IssuesObject {
  list: Array<IssueObject> | null;
}

class Issues {
  list: Array<Issue> = [];

  constructor(data?: Array<IssueObject>) {
    this.list =
      data && Array.isArray(data) ? data.map((issue) => new Issue(issue)) : [];
  }

  fromGitHubGraphQL(issues?: Array<IssueGQL>) {
    this.list =
      issues && issues.length > 0
        ? issues.map((issueGQL) => {
            const issue = new Issue();
            issue.fromGitHubGraphQL(issueGQL);
            return issue;
          })
        : [];
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
