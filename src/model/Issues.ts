import Issue, { IssueObject, IssueGQL } from './Issue';

export interface IssuesObject {
  list: Array<IssueObject> | null;
}

class Issues {
  list: Array<Issue> = [];
  features: Array<Issue>;
  tasks: Array<Issue>;
  design: Array<Issue>;
  development: Array<Issue>;
  delivery: Array<Issue>;

  constructor(data?: Array<IssueObject>) {
    this.list =
      data && Array.isArray(data) ? data.map((issue) => new Issue(issue)) : [];
    this.features = this.list.filter(
      (issue) => issue.type && issue.type.includes('Feature')
    );
    this.tasks = this.list.filter(
      (issue) => issue.type && issue.type.includes('Task')
    );
    this.design = this.tasks.filter(
      (issue) => issue.labels && issue.labels.includes('design')
    );
    this.development = this.tasks.filter(
      (issue) => issue.labels && issue.labels.includes('development')
    );
    this.delivery = this.tasks.filter(
      (issue) => issue.labels && issue.labels.includes('delivery')
    );
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
