import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import IconComponent from './IconComponent';
var ProjectSkills = function (_a) {
    var skills = _a.skills;
    return (_jsx(_Fragment, { children: (skills === null || skills === void 0 ? void 0 : skills.size) > 0 && (_jsx("div", { className: "project-skills-bar", children: Array.from(skills).map(function (skill, index) { return (_jsx("div", { className: "icon", children: _jsx("a", { href: "#/projects/".concat(skill.path, "/").concat(skill.id), children: _jsx(IconComponent, { image: skill.image }) }) }, index)); }) })) }));
};
export default ProjectSkills;
