import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProjectSkillsBar from './ProjectSkillsBar';
var TaxListIcon = function (_a) {
    var title = _a.title, taxonomies = _a.taxonomies;
    return (taxonomies.size > 0 && (_jsxs("div", { className: "tax-list", children: [_jsx("h4", { className: "title", children: title }), _jsx("div", { className: "tax-row", children: _jsx(ProjectSkillsBar, { skills: taxonomies }) })] })));
};
export default TaxListIcon;
