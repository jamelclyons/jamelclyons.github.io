var GitHubRepoQuery = /** @class */ (function () {
    function GitHubRepoQuery(owner, repo) {
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "repo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.owner = owner;
        this.repo = repo;
    }
    return GitHubRepoQuery;
}());
export default GitHubRepoQuery;
