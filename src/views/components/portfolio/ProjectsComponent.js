import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import PortfolioProject from './PortfolioProject';
var ProjectsComponent = function (_a) {
    var projects = _a.projects;
    return (_jsx(_Fragment, { children: projects.size > 0 && (Array.from(projects).map(function (project, index) { return (_jsx(PortfolioProject, { project: project }, index)); })) }));
};
export default ProjectsComponent;
