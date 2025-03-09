import Model from './Model';
import RepoContentQuery from './RepoContentQuery';

export type ContentURLObject = {
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
  isValid: boolean;
};

class ContentURL extends Model {
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
  isValid: boolean;

  constructor(url: string) {
    super();

    this.owner = null;
    this.repo = null;
    this.path = null;
    this.branch = null;
    this.url = null;
    this.isValid = false;

    try {
      const pathname = new URL(url).pathname;
      console.log(new URL(url))

      const parts = pathname.split('/');

      if (parts.length < 5) throw new Error('Invalid URL format');

      this.owner = parts[1];
      this.repo = parts[2];
      this.path = parts[4];
      this.branch = parts[3];
      this.url = url;
      this.isValid = true;
    } catch (error) {
      const err = error as Error;
      throw new Error('Error fetching content:', err);
    }
  }

  toContentURLObject(): ContentURLObject {
    return {
      owner: this.owner,
      repo: this.repo,
      path: this.path,
      branch: this.branch,
      url: this.url,
      isValid: this.isValid,
    };
  }

  toRepoContentQuery(): RepoContentQuery | null {
    try {
      if (this.owner == null) {
        throw new Error('Owner is of repo is required.');
      }

      if (this.repo == null) {
        throw new Error('Repo is required.');
      }

      if (this.path == null) {
        throw new Error('Path to content is required.');
      }

      if (this.branch == null) {
        throw new Error('Branch within the repo is required.');
      }

      if (!this.isValid) {
        return null;
      }

      return new RepoContentQuery(
        this.owner,
        this.repo,
        this.path,
        this.branch
      );
    } catch (error) {
      const err = error as Error;
      throw new Error('Error creating RepoContentQuery:', err);
    }
  }
}

export default ContentURL;
