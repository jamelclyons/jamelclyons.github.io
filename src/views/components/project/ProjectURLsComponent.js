import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import IconComponent from "../IconComponent";
var ProjectURLsComponent = function (_a) {
    var projectUrls = _a.projectUrls;
    return (_jsx(_Fragment, { children: Array.isArray(projectUrls) && projectUrls.length > 0 ? (_jsx("div", { className: "project-urls", children: projectUrls.map(function (projectUrl, index) { return (_jsxs("button", { onClick: function () { return window.open(projectUrl.url, '_blank'); }, children: [_jsx(IconComponent, { image: projectUrl.image }), _jsx("h3", { children: "".concat(projectUrl.name) })] }, index)); }) })) : ('') }));
};
export default ProjectURLsComponent;
