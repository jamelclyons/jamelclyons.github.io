import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Member from '../member/Member';
var ProjectTeamComponent = function (_a) {
    var projectTeam = _a.projectTeam;
    return (_jsx(_Fragment, { children: Array.isArray(projectTeam) && projectTeam.length > 0 && (_jsxs("div", { className: "project-team", children: [_jsx("h4", { className: "title", children: "Project Team" }), _jsx("div", { className: "project-team-list", children: projectTeam.map(function (team_member, index) { return (_jsx(Member, { user: team_member }, index)); }) })] })) }));
};
export default ProjectTeamComponent;
