import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var ProjectStatusComponent = function (_a) {
    var projectStatus = _a.projectStatus;
    var createdAt = projectStatus.createdAt, updatedAt = projectStatus.updatedAt, progress = projectStatus.progress;
    return (_jsx(_Fragment, { children: createdAt && updatedAt && progress && (_jsx(_Fragment, { children: _jsxs("div", { className: "project-status", children: [_jsx("h4", { children: "STATUS" }), _jsxs("h5", { children: ["Started: ", createdAt] }), _jsxs("h5", { children: ["Updated: ", updatedAt] }), _jsx("progress", { value: progress, max: "100" }), _jsxs("p", { children: [progress, "% Completed"] })] }) })) }));
};
export default ProjectStatusComponent;
