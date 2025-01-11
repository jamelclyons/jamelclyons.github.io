import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
var ProjectDescription = function (_a) {
    var description = _a.description;
    return (_jsx(_Fragment, { children: description && (_jsx("div", { className: "project-description", children: _jsx("p", { children: description }) })) }));
};
export default ProjectDescription;
