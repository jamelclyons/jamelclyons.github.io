import SubIssueSummary, { SubIssueSummaryObject } from './SubIssueSummary';
import User, { UserObject } from './User';

export type IssuesGQL = {
  id: string;
  number: number;
  title: string;
  state: string;
  body: string;
  type: string;
  createdAt: string;
  url: string;
  labels: {
    nodes: Array<string>;
  };
  repository: {
    name: string;
    nameWithOwner: string;
    url: string;
  };
  trackedInIssues: {
    nodes: Array<number>;
  };
};

export interface IssueObject {
  id: string | number;
  created_at: string;
  updated_at: string;
  sub_issues_summary: SubIssueSummaryObject | null;
  title: string;
  body: string;
  state: string;
  type: string | null;
  milestone: string | null;
  labels: Array<string> | null;
  assignee: UserObject | null;
  assignees: Array<UserObject> | null;
  trackedBy: Array<number>;
}

class Issue {
  id: string | number;
  createdAt: string;
  updatedAt: string;
  subIssuesSummary: SubIssueSummary | null;
  title: string;
  body: string;
  state: string;
  type: string;
  milestone: string | null;
  labels: Array<string>;
  assignee: User | null;
  assignees: Array<User>;
  trackedBy: Array<number>;
  nameWithOwner: string | null;

  constructor(data: IssueObject | Record<string, any> = {}) {
    this.id = data.id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.subIssuesSummary = data.sub_issues_summary
      ? new SubIssueSummary(data.sub_issues_summary)
      : null;
    this.title = data.title;
    this.body = data.body;
    this.state = data.state;
    this.type =
      data.type && data.type.name
        ? data.type.name
        : data.type
        ? data.type
        : null;
    this.milestone =
      data.milestone && data.milestone.title
        ? data.milestone.title
        : data.milestone
        ? data.milestone
        : null;
    this.labels =
      data.labels && Array.isArray(data.labels) && data.labels.length > 0
        ? data.labels.map((label) => (label && label.name ? label.name : label))
        : [];
    this.assignee = data.assignee ? new User(data.assignee) : null;
    this.assignees =
      data.assignees &&
      Array.isArray(data.assignees) &&
      data.assignees.length > 0
        ? data.assignees.map((assignee) => new User(assignee))
        : [];
    this.trackedBy = data.trackedBy;
    this.nameWithOwner = 'ppp';
  }

  fromGitHubGraphQL(issue: IssuesGQL) {
    console.log(issue);
    this.id = issue.id;
    this.title = issue.title;
    this.body = issue.body;
    this.state = issue.state;
    this.type = issue.type;
    this.labels = issue.labels && issue.labels.nodes ? issue.labels.nodes : [];
    this.trackedBy =
      issue.trackedInIssues && issue.trackedInIssues.nodes
        ? issue.trackedInIssues.nodes
        : [];
    this.nameWithOwner =
      issue.repository && issue.repository.nameWithOwner
        ? issue.repository.nameWithOwner
        : null;
  }

  toIssueObject(): IssueObject {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      sub_issues_summary: this.subIssuesSummary
        ? this.subIssuesSummary.toSubIssueSummaryObject()
        : null,
      title: this.title,
      body: this.body,
      state: this.state,
      type: this.type,
      milestone: this.milestone,
      labels: this.labels ? this.labels : null,
      assignee: this.assignee ? this.assignee.toUserObject() : null,
      assignees: this.assignees
        ? this.assignees.map((assignee) => assignee.toUserObject())
        : [],
      trackedBy: this.trackedBy,
    };
  }
}

export default Issue;
